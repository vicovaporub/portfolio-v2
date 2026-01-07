'use client';
 
import { Geist, Geist_Mono } from "next/font/google";
import SystemError from "@/components/SystemError";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
 
export default function GlobalError({
    error,
    reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SystemError error={error} reset={reset} />
            </body>
        </html>
    );
}