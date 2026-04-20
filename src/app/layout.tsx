import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});

export const metadata: Metadata = {
  title: "Oriona | Agencia Creativa y Desarrollo Web",
  description: "Explora el universo digital con Oriona. Agencia especializada en marketing digital, diseño UX/UI y desarrollo web de vanguardia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
