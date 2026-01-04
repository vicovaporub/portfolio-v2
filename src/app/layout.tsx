import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/contexts/AppProvider";
import { getUserData } from "@/server-logic/controllers/userController";
import { getProjectsArrayWithTechnologies } from "@/server-logic/controllers/projectsController";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Victor Castro - Portfolio",
    description: "Portfolio pessoal de Victor Castro - Desenvolvedor Full Stack",
};

export default async function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Agora usando os Controllers, que já cuidam da lógica de negócio
    const [user, projects] = await Promise.all([
        getUserData(),
        getProjectsArrayWithTechnologies()
    ]);

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AppProvider initialUser={user} initialProjects={projects}>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
