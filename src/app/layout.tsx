// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono, georgia, montserrat } from "@/lib/fonts";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { DevSessionInspector } from "@/components/auth/DevSessionInspector"; // Add this import

export const metadata: Metadata = {
  title: "Absolutely Desi",
  description: "Premium affiliate marketplace for authentic Indian ethnic wear",
  keywords: "Indian clothing, ethnic wear, saree, lehenga, kurta, affiliate marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${georgia.variable} ${montserrat.variable} antialiased bg-black text-white`}
      >
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
            {process.env.NODE_ENV === "development" && <DevSessionInspector />} {/* Add here */}
          </AuthProvider>
      </body>
    </html>
  );
}