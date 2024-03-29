import type { MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import type { ReactNode } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header></header>
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

export const ErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <Layout>
                    <h1>404 Not Found</h1>
                </Layout>
            );
        }
    }

    return (
        <Layout>
            <h1>500 Server Error</h1>
        </Layout>
    );
};

export default LayoutWithOutlet;
