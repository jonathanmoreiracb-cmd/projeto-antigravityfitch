-- Create home_highlights table
create table if not exists home_highlights (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  titulo_override text null,
  subtitulo_override text null,
  estilo text not null default 'dark', -- 'dark' | 'light' | 'blue'
  ordem int not null default 1,
  ativo boolean not null default true,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table home_highlights enable row level security;

-- Policies
create policy "Public can view active highlights"
  on home_highlights for select
  using (ativo = true);

create policy "Authenticated can manage highlights"
  on home_highlights for all
  using (auth.role() = 'authenticated');
