import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Fraunces,
  Inter,
  Space_Grotesk,
} from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-editorial-heading-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-editorial-sans-raw",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-vibrant-heading-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuéntame — Tu Coach Financiero",
  description:
    "Domina el arte japonés del ahorro con el método Kakebo. Transforma tus gastos en rituales de prosperidad.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const themeClass =
    themeCookie === "editorial"
      ? "theme-editorial"
      : themeCookie === "vibrant"
        ? "theme-vibrant"
        : themeCookie === "aurora"
          ? "theme-aurora"
          : "";

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable} ${themeClass} h-full antialiased`}
    >
      <body className="h-dvh flex flex-col" suppressHydrationWarning>
        <div
          className="fixed inset-0 -z-10 h-full w-full"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, var(--surface-from) 40%, var(--surface-to) 100%)",
          }}
        />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
