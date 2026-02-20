const PIX_GUI = 'BR.GOV.BCB.PIX';

export interface PixPayloadInput {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txid?: string;
  description?: string;
}

function formatField(id: string, value: string): string {
  const fieldLength = value.length;
  if (fieldLength > 99) {
    throw new Error(`PIX field ${id} exceeds max length`);
  }

  return `${id}${fieldLength.toString().padStart(2, '0')}${value}`;
}

function sanitizeText(value: string, maxLength: number, fallback = ''): string {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9 $%*+\-./:]/g, '')
    .trim()
    .slice(0, maxLength);

  if (normalized.length > 0) {
    return normalized;
  }

  return fallback;
}

function crc16(payload: string): string {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function buildPixPayload(input: PixPayloadInput): string {
  const pixKey = input.pixKey.trim();
  if (!pixKey) {
    throw new Error('PIX key is required');
  }

  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('PIX amount must be greater than zero');
  }

  const merchantName = sanitizeText(input.merchantName, 25, 'RECEBEDOR');
  const merchantCity = sanitizeText(input.merchantCity, 15, 'SAO PAULO');
  const txid = sanitizeText(input.txid ?? '***', 25, '***');
  const description = input.description
    ? sanitizeText(input.description, 72)
    : '';

  const merchantAccountInfo = [
    formatField('00', PIX_GUI),
    formatField('01', pixKey),
    description ? formatField('02', description) : '',
  ].join('');

  const payloadWithoutCrc = [
    formatField('00', '01'),
    formatField('01', '11'),
    formatField('26', merchantAccountInfo),
    formatField('52', '0000'),
    formatField('53', '986'),
    formatField('54', amount.toFixed(2)),
    formatField('58', 'BR'),
    formatField('59', merchantName),
    formatField('60', merchantCity),
    formatField('62', formatField('05', txid)),
    '6304',
  ].join('');

  return payloadWithoutCrc + crc16(payloadWithoutCrc);
}
