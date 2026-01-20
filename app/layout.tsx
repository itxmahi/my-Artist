import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Professional Font
import "./globals.css";

// Font optimization taaki site fast load ho
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art Gallery | Premium Calligraphy",
  description: "Experience the fusion of spiritual heritage and modern minimalism.",
  icons: {
    icon: "/logo.png", // Aapka logo favicon ban jayega
  },
};

// Mobile optimization ke liye viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${inter.className} antialiased`} 
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}