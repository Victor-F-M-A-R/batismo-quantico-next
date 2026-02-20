import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'A Lapidação da Pedra Bruta',
  description: 'Uma jornada de 21 dias para a consciência EU SOU.',
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
