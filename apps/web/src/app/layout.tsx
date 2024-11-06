import './global.css';
import { Metadata } from 'next';
import * as React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme.provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Conversify.Ai',
    description: 'Build reliable, cost-efficient, and fast AI chatbot',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}