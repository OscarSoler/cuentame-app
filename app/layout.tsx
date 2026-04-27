import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
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
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="h-dvh flex flex-col" suppressHydrationWarning>
        <div
          className="fixed inset-0 -z-10 h-full w-full bg-[#F5F0E8]"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #F5F0E8 40%, #E8E0D0 100%)",
          }}
        />
        <div className="container mx-auto h-full flex flex-col shadow-xl bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
