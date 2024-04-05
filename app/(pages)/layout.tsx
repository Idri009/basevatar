import type { Metadata } from "next";
import { headers } from "next/headers";
//
import Web3ModalProvider from "../providers/Web3ModalProvider";
import { cookieToInitialState } from "wagmi";
import { config } from "../config/wallet-connect/wagmiConfig";
//
import "../assets/scss/layout.scss";
import Navbar from "../components/Navbar/Navbar";
import NextAuthProvider from "../providers/NextAuthProvider";

export const metadata: Metadata = {
    title: "Basevatar",
    description: "Basevatar",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get("cookie"));

    return (
        <NextAuthProvider>
            <Web3ModalProvider initialState={initialState}>
                <header>
                    <Navbar />
                </header>
                <main>{children}</main>
            </Web3ModalProvider>
        </NextAuthProvider>
    );
}
