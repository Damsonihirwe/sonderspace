const STORE_WHATSAPP_NUMBER = '250796702186';

export function buildWhatsAppOrderLink(details: {
  artistName?: string;
  productTitle?: string;
  imageUrl?: string;
  size?: string;
  color?: string;
  notes?: string;
}) {
  const lines = [
    "Hey SONDERspace! I'd like to order:",
    '',
    details.artistName ? `Artist: ${details.artistName}` : null,
    details.productTitle ? `Item: ${details.productTitle}` : null,
    details.imageUrl ? `Tee image: ${details.imageUrl}` : null,
    details.size ? `Size: ${details.size}` : null,
    details.color ? `Color: ${details.color}` : null,
    details.notes ? `Notes: ${details.notes}` : null,
    '',
    'Can you confirm availability, price, and how to pay?',
  ].filter(Boolean);

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
