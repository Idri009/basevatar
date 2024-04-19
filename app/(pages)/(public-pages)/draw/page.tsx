import { prisma } from "@/app/lib/db";
import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";

const Page = async () => {
    const session = await getSession();

    //
    const theme = await prisma.settings.findFirst({
        where: {
            key: "theme",
        },
    });

    const colors = await prisma.settings.findFirst({
        where: {
            key: "color",
        },
    });

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {session?.address == null && <WarningMessage />}
                    {session?.address && (
                        <CanvasContextProvider>
                            <Canvas theme={theme!.value} colors={colors!.value} />
                        </CanvasContextProvider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
