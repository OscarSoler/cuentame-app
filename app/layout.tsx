import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cuéntame — Tu Santuario Financiero",
  description:
    "Domina el arte japonés del ahorro con el método Kakebo. Transforma tus gastos en rituales de prosperidad.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${playfair.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="h-dvh flex flex-col" suppressHydrationWarning>
        <div className="fixed inset-0 -z-10 h-full w-full" style={{ background: "linear-gradient(to bottom, #2D50161F 0%, #F5F0E8 180px, #F5F0E8 100%)" }} />
        <div className="container mx-auto h-full flex flex-col shadow-xl bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
