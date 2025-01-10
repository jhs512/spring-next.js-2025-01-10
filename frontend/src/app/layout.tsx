import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-[100dvh] border-[5px]`}
      >
        <header className="border-[2px] border-[red]">
          <a href="/">홈</a>
          <a href="/about">소개</a>
        </header>

        <main className="flex-grow border-[2px] border-[blue]">{children}</main>

        <footer className="border-[2px] border-[pink]">Copyright 2025.</footer>
      </body>
    </html>
  );
}
