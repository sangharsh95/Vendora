import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "Vendora - Shop smarter",
    description: "Vendora - Shop smarter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <NextAuthProvider>
                    <StoreProvider>
                        <Toaster />
                        {children}
                    </StoreProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
