import localFont from "next/font/local";
import { Montserrat } from 'next/font/google';

// Load local fonts
export const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define system font (Georgia) using CSS variable
export const georgia = {
  variable: '--font-georgia',
  fontFamily: 'Georgia, serif',
};

// Load Google fonts
export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
