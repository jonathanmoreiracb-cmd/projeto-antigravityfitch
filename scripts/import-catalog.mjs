import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

function parseCSV(text) {
    // parser simples (funciona porque seus nomes não têm vírgula entre aspas)
    const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
    const header = lines[0].split(",").map(s => s.trim());
    return lines.slice(1).map(line => {
        const cols = line.split(",").map(s => s.trim());
        const obj = {};
        header.forEach((h, i) => (obj[h] = cols[i] ?? ""));
        return obj;
    });
}

function toBool(v) {
    return String(v).toLowerCase() === "true";
}

function toNum(v) {
    const n = Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : null;
}

async function main() {
    // carrega .env.import manualmente (sem depender de libs)
    const envPath = path.resolve(".env.import");
    const envText = fs.readFileSync(envPath, "utf8");
    for (const line of envText.split(/\r?\n/)) {
        if (!line.trim() || line.trim().startsWith("#")) continue;
        const [k, ...rest] = line.split("=");
        process.env[k.trim()] = rest.join("=").trim();
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const csvPath = process.env.IMPORT_CSV || "./fitch_import_0302.csv";

    if (!url || !key) {
        throw new Error("Faltou SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env.import");
    }

    const supabase = createClient(url, key);

    const csvText = fs.readFileSync(path.resolve(csvPath), "utf8");
    const rows = parseCSV(csvText);

    // 1) UPSERT produtos por slug
    const productsPayload = rows.map(r => ({
        nome: r.nome,
        slug: r.slug,
        categoria: r.categoria,
        condicao: r.condicao,
        estoque: toNum(r.estoque) ?? 0,
        destaque: toBool(r.destaque),
        ativo: toBool(r.ativo),
        descricao_curta: null,
        armazenamento: null,
        cor: null,
        bateria_percentual: null,
    }));

    const { data: upserted, error: upErr } = await supabase
        .from("products")
        .upsert(productsPayload, { onConflict: "slug" })
        .select("id,slug");

    if (upErr) throw upErr;

    const slugToId = new Map(upserted.map(p => [p.slug, p.id]));

    // 2) Preços: para cada produto, atualiza o ativo; se não existir, cria
    for (const r of rows) {
        const product_id = slugToId.get(r.slug);
        if (!product_id) continue;

        const payload = {
            product_id,
            avista: toNum(r.avista),
            doze_parcela: toNum(r["12x_parcela"]),
            doze_total: toNum(r["12x_total"]),
            ativo: true,
        };



        // tenta atualizar o preço ativo
        const { data: updated, error: upPriceErr } = await supabase
            .from("prices")
            .update(payload)
            .eq("product_id", product_id)
            .eq("ativo", true)
            .select("id");

        if (upPriceErr) throw upPriceErr;

        if (!updated || updated.length === 0) {
            const { error: insErr } = await supabase.from("prices").insert(payload);
            if (insErr) throw insErr;
        }
    }

    console.log(`✅ Import concluído: ${rows.length} itens (produtos + preços).`);
}

main().catch((e) => {
    console.error("❌ Erro no import:", e);
    process.exit(1);
});
