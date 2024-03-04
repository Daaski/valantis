import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'scss/_reset.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valantis",
  description: "Valantis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
