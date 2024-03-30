import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { ReactNode } from "react";
import Navbar from "~/components/Navbar/Navbar";

export const meta: MetaFunction = () => {
    return [{ title: "Basevatar" }, { name: "description", content: "Welcome to Basevatar!" }];
};

import "../assets/scss/layout.scss";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
        </>
    );
};

const LayoutWithOutlet = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default LayoutWithOutlet;
