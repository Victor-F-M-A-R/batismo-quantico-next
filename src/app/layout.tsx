import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Desbastando a Pedra Bruta',
  description: 'Uma jornada de 21 dias para a consciÃªncia EU SOU.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
