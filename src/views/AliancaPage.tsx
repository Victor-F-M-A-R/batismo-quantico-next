'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Sparkles, Heart, Crown } from 'lucide-react';
import QRCode from 'qrcode';
import { buildPixPayload } from '../utils/pix';

interface AllianceLevel {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  values: string;
  examples: string;
  concept: string;
  cta: string;
  highlight: boolean;
  amount: number;
  txid: string;
}

const ALLIANCE_LEVELS: AllianceLevel[] = [
  {
    id: 'jaco',
    title: 'A Semente de Jacó',
    subtitle: 'O Início',
    icon: <Sparkles className="w-7 h-7" />,
    values: 'R$ 7,77',
    examples: 'Valor padrão da Semente de Jacó, mas cada um semeia conforme o seu coração',
    concept:
      'A fé no pouco: "Quem é fiel no pouco, sobre muito será colocado." — Mateus 25:21',
    cta: 'Plantar Semente de Jacó',
    highlight: false,
    amount: 7.77,
    txid: 'JACO777',
  },
  {
    id: 'pesca',
    title: 'A Pesca Maravilhosa',
    subtitle: 'A Abundância',
    icon: <Heart className="w-7 h-7" />,
    values: 'R$ 77,77',
    examples: 'Valor padrão da Pesca Maravilhosa, mas cada um semeia conforme o seu coração',
    concept:
      'Para quem já vive o milagre. Uma boa pesca, redes cheias.',
    cta: 'Honrar a Pesca Maravilhosa',
    highlight: false,
    amount: 77.77,
    txid: 'PESCA7777',
  },
  {
    id: '318',
    title: 'Seja a Própria Bênção',
    subtitle: 'Nível Abraâmico',
    icon: <Crown className="w-7 h-7" />,
    values: 'R$ 318,00',
    examples: 'Valor padrão de Seja a Própria Bênção, mas cada um semeia conforme o seu coração',
    concept:
      'Você não pede mais a bênção: você se torna a própria bênção que sustenta a obra.',
    cta: 'Firmar Aliança 318',
    highlight: true,
    amount: 318,
    txid: 'SEJABENCAO318',
  },
];

const PIX_KEY = '+5511965040342';
const PIX_DISPLAY = '(11) 96504-0342';
const PIX_CNPJ_KEY = '54.100.589/0001-29';
const MERCHANT_NAME = 'Fraternidade Luz';
const MERCHANT_CITY = 'Sao Paulo';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export default function AliancaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [pixPayload, setPixPayload] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedLevel = useMemo(
    () => ALLIANCE_LEVELS.find((level) => level.id === selectedLevelId) ?? null,
    [selectedLevelId]
  );

  useEffect(() => {
    if (!selectedLevel) {
      setPixPayload('');
      setQrCodeDataUrl('');
      return;
    }

    let isMounted = true;

    try {
      const payload = buildPixPayload({
        pixKey: PIX_KEY,
        merchantName: MERCHANT_NAME,
        merchantCity: MERCHANT_CITY,
        amount: selectedLevel.amount,
        txid: selectedLevel.txid,
        description: selectedLevel.title,
      });

      setPixPayload(payload);

      QRCode.toDataURL(payload, {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 640,
        color: {
          dark: '#111111',
          light: '#FFFFFF',
        },
      })
        .then((dataUrl) => {
          if (isMounted) {
            setQrCodeDataUrl(dataUrl);
          }
        })
        .catch(() => {
          if (isMounted) {
            setQrCodeDataUrl('');
          }
        });
    } catch {
      setPixPayload('');
      setQrCodeDataUrl('');
    }

    return () => {
      isMounted = false;
    };
  }, [selectedLevel]);

  const handleOpenModal = (level: AllianceLevel) => {
    setSelectedLevelId(level.id);
    setModalOpen(true);
    setCopied(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCopy = async () => {
    const valueToCopy = pixPayload || PIX_KEY;

    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = valueToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-temple">
      <header className="border-b border-accent-gold/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-cinzel text-xs tracking-[0.2em] text-primary-muted hover:text-accent-gold transition-colors duration-300"
          >
            <span className="text-accent-gold/60">←</span>
            <span>INÍCIO</span>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '128px 128px',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

        <div className="relative py-20 sm:py-28 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="block w-12 h-px bg-accent-gold/50" />
            <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-inter">Aliança</span>
            <span className="block w-12 h-px bg-accent-gold/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent-gold leading-snug max-w-4xl mx-auto"
            style={{ fontStyle: 'italic' }}
          >
            "Foste fiel no pouco, sobre o muito te colocarei."
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 font-inter text-sm sm:text-base text-primary/50 tracking-wide"
          >
            — Mateus 25:21
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent-gold/30">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4 text-center font-inter text-base sm:text-lg text-primary/60 leading-relaxed">
            Reprogramação da prosperidade para te ajudar a alimentar a fé e permanecer na aliança com Deus ∴
          </p>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-accent-gold/20 bg-black/5 shadow-md">
            <iframe
              src="https://www.youtube.com/embed/0IszjUZ0_VQ?rel=0&modestbranding=1"
              title="Reprogramação para alimentar a fé"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {ALLIANCE_LEVELS.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative"
              >
                {level.highlight && (
                  <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-b from-accent-gold/10 via-accent-gold/5 to-transparent rounded-3xl blur-xl pointer-events-none" />
                )}

                <div
                  className={`
                    relative h-full flex flex-col
                    bg-white rounded-2xl p-8 sm:p-10
                    border transition-all duration-500
                    ${level.highlight
                      ? 'border-accent-gold/50 shadow-lg shadow-accent-gold/10'
                      : 'border-accent-gold/20 hover:border-accent-gold/40'
                    }
                  `}
                >
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-6
                    ${level.highlight
                      ? 'bg-accent-gold/15 text-accent-gold'
                      : 'bg-accent-gold/8 text-accent-gold/70'
                    }
                  `}>
                    {level.icon}
                  </div>

                  <span className="text-accent-gold/60 text-xs tracking-[0.3em] uppercase font-inter mb-2">
                    {level.subtitle}
                  </span>

                  <h3 className="font-cinzel text-xl sm:text-2xl text-primary mb-5 leading-tight">
                    {level.title}
                  </h3>

                  <div className="w-10 h-px bg-accent-gold/30 mb-5" />

                  <p className="font-cinzel text-sm text-accent-gold mb-1">{level.values}</p>
                  {level.examples && (
                    <p className="font-inter text-xs text-primary/40 mb-5">{level.examples}</p>
                  )}
                  {!level.examples && <div className="mb-5" />}

                  <p className="font-inter text-sm text-primary/65 leading-relaxed italic flex-grow mb-8">
                    "{level.concept}"
                  </p>

                  <button
                    onClick={() => handleOpenModal(level)}
                    className="w-full py-3.5 rounded-xl font-cinzel text-sm tracking-wider transition-all duration-300 cursor-pointer bg-accent-gold text-white hover:bg-accent-gold/90 shadow-md shadow-accent-gold/20"
                  >
                    {level.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:pb-16">
        <div className="max-w-4xl mx-auto bg-white/70 border border-accent-gold/15 rounded-2xl p-6 sm:p-8">
          <p className="font-inter text-sm sm:text-base text-primary/70 leading-relaxed mb-4">
            O CNPJ também é chave PIX: <span className="font-semibold text-primary">{PIX_CNPJ_KEY}</span>
          </p>
          <p className="font-inter text-sm sm:text-base text-primary/70 leading-relaxed mb-5">
            Para quem não usa PIX, pode fazer um depósito nas lotéricas.
          </p>

          <div className="bg-primary/[0.03] border border-accent-gold/15 rounded-xl px-4 py-4 mb-5">
            <p className="font-cinzel text-sm text-accent-gold mb-2">Conta Caixa</p>
            <p className="font-inter text-sm text-primary/75">Agência: 3880</p>
            <p className="font-inter text-sm text-primary/75">Operação: 1288</p>
            <p className="font-inter text-sm text-primary/75">Conta: 930732631-8</p>
          </div>

          <p className="font-inter text-sm sm:text-base text-primary/70 leading-relaxed mb-5">
            Envie o Comprovante para a fraternidade pelo{' '}
            <a
              href="https://wa.me/5511965040342?text=est%C3%A1%20feito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-2 transition-colors"
            >
              WhatsApp
            </a>{' '}
            para colocarmos o seu nome no Livro da Semeadura.
          </p>

          <blockquote className="font-cinzel text-sm sm:text-base text-accent-gold/90 leading-relaxed italic text-center">
            "O Deus Altíssimo que dá a semente ao que semeia também multiplicará a vossa sementeira, e aumentará os frutos da vossa justiça; 2 Coríntios 9:10"
          </blockquote>
        </div>
      </section>

      <section className="border-t border-accent-gold/10 py-12 px-6 text-center">
        <p className="font-inter text-sm sm:text-base text-primary/45 max-w-md mx-auto leading-relaxed">
          Toda semente plantada é consagrada em oração pela Fraternidade.
          <br />
          Que o Grande Arquiteto do Universo multiplique sua colheita.
        </p>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl p-5 sm:p-6 max-w-[460px] w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-accent-gold/20"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-primary/40" />
              </button>

              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="block w-8 h-px bg-accent-gold/40" />
                  <Crown className="w-5 h-5 text-accent-gold" />
                  <span className="block w-8 h-px bg-accent-gold/40" />
                </div>
                <h2 className="font-cinzel text-lg sm:text-xl text-primary mb-1.5">Firme aqui sua Aliança</h2>
                <h3 className="font-cinzel text-base sm:text-lg text-accent-gold">com Deus</h3>
                {selectedLevel && (
                  <p className="mt-2 font-inter text-xs text-primary/50 tracking-wide uppercase">
                    {selectedLevel.title}
                  </p>
                )}
                {selectedLevel && (
                  <p className="mt-1 font-cinzel text-sm sm:text-base text-accent-gold">
                    Valor padrão: {formatBRL(selectedLevel.amount)}
                  </p>
                )}
              </div>

              <div className="flex justify-center mb-2">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-2xl border border-accent-gold/20 flex items-center justify-center overflow-hidden shadow-sm">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt={`QR Code PIX ${selectedLevel?.title ?? ''}`}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <p className="px-6 text-center text-xs text-primary/45">Gerando QR Code PIX...</p>
                  )}
                </div>
              </div>

              <p className="text-center font-inter text-[10px] sm:text-[11px] text-primary/45 mb-4 leading-relaxed">
                Escaneie no app do Banco do Brasil (ou outro banco) para abrir o pagamento PIX com valor preenchido.
              </p>

              <div className="mb-5">
                <p className="text-center font-inter text-xs text-primary/40 mb-2 tracking-wide uppercase">
                  PIX Copia e Cola (BR Code)
                </p>
                <div className="bg-primary/[0.03] rounded-xl p-2.5 border border-accent-gold/15 mb-2">
                  <p className="font-mono text-[10px] leading-relaxed text-primary/70 break-all max-h-16 overflow-auto">
                    {pixPayload || 'Gerando código...'}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 bg-primary/[0.03] rounded-xl px-3 py-2.5 border border-accent-gold/15">
                  <div className="text-center">
                    <p className="font-inter text-xs text-primary/55">Chave PIX celular: {PIX_DISPLAY}</p>
                    <p className="font-inter text-[11px] text-primary/55">CNPJ chave PIX: {PIX_CNPJ_KEY}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 transition-colors cursor-pointer"
                    title="Copiar código PIX"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-accent-gold" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-xs text-green-600 mt-2 font-inter"
                    >
                      ✓ Código PIX copiado com sucesso!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-accent-gold/15" />
                <Sparkles className="w-3 h-3 text-accent-gold/30" />
                <div className="flex-1 h-px bg-accent-gold/15" />
              </div>

              <p className="text-center font-inter text-xs sm:text-sm text-primary/55 leading-relaxed">
                Envie o Comprovante para a fraternidade pelo{' '}
                <a
                  href="https://wa.me/5511965040342?text=est%C3%A1%20feito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-2 transition-colors"
                >
                  WhatsApp
                </a>{' '}
                para colocarmos o seu nome no Livro da Semeadura.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
