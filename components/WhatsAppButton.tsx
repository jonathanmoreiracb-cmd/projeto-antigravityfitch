export default function WhatsAppButton() {
    const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/55000000000";

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center font-bold"
            aria-label="Fale conosco no WhatsApp"
        >
            WhatsApp
        </a>
    );
}
