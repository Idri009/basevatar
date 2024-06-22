import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";
import fetchDraw from "@/app/actions/public-pages/fetch-draw";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import fetchSettings from "@/app/actions/common/fetch-settings";
import { checkIfUserHasAlreadyUploaded } from "@/app/actions/public-pages/canvas-actions";
import Image from "next/image";

const Page = async () => {
    const currDate = new Date().getTime();
    const session = await getSession();
    const { theme, colors, error: drawError } = await fetchDraw();
    const { settings, error: settingsError } = await fetchSettings();
    const finish_time = settings.find((setting) => setting.key === "finish_time");
    const day = settings.find((setting) => setting.key === "day");
    const userHasAlreadyUploaded = await checkIfUserHasAlreadyUploaded(+day?.value!, session?.address!);

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {(settingsError || drawError) && <ServerErrorMessage />}
                    {session && session.address == null && <WarningMessage />}
                    {userHasAlreadyUploaded && (
                        <div className="py-4 text-red-300 font-bold">
                            You have already uploaded an image for today. Please come back tomorrow.
                            <div className="text-white py-2">Your draw</div>
                            <Image width={360} height={360} src={userHasAlreadyUploaded.url} alt="image" />
                        </div>
                    )}
                    {!drawError && session && session.address && !userHasAlreadyUploaded && (
                        <CanvasContextProvider>
                            <Canvas
                                theme={theme!.value}
                                colors={colors!.value}
                                currentTime={currDate}
                                finishTime={Number(finish_time?.value) || 0}
                            />
                        </CanvasContextProvider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
