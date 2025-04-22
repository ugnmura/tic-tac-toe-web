import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const dynamic = "force-static";
export const fetchCache = "force-no-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tic Tac Toe",
    template: "%s | Tic Tac Toe",
  },
  description: "Play Tic Tac Toe online with friends.",
  keywords: ["tic tac toe", "game", "online", "multiplayer"],
  openGraph: {
    title: "Tic Tac Toe",
    description: "Play Tic Tac Toe online with friends.",
    url: "https://tictactoe.sushiwaumai.com",
    siteName: "Tic Tac Toe",
    images: [
      {
        url: "https://tictactoe.sushiwaumai.com/icon.jpeg",
        alt: "Tic Tac Toe Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Toe",
    description: "Play Tic Tac Toe online with friends.",
    images: ["https://tictactoe.sushiwaumai.com/icon.jpeg"],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html data-theme="bento" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
