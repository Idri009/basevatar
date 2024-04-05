import { prisma } from "@/app/db";
import Colors from "./components/Colors";
import Subjects from "./components/Subjects";

const VOTE_ETH_PRICE = "0.0002";

const Page = async () => {
    const settings = await prisma.settings.findFirst({
        where: {
            key: "day",
        },
    });

    const colors = await prisma.votes.findMany({
        where: {
            type: "color",
            day: Number(settings?.value) + 1 ?? 1,
        },
    });

    const subjects = await prisma.votes.findMany({
        where: {
            type: "subject",
            day: Number(settings?.value) + 1 ?? 1,
        },
    });

    return (
        <section className="section-vote">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Vote for Day #{Number(settings?.value) + 1 || 1} Themes</h1>
                    <p className="subtitle">
                        Vote for the colors and subjects you want to see in the next day&apos;s theme.
                    </p>
                    <p className="subtitle">Each vote costs {VOTE_ETH_PRICE} ETH.</p>
                </div>
                <div className="row gx-8">
                    <div className="sm:col-6 lg:col-4">
                        <Colors data={colors} ethPrice={VOTE_ETH_PRICE} />
                    </div>
                    <div className="sm:col-6 lg:col-4">
                        <Subjects data={subjects} ethPrice={VOTE_ETH_PRICE} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
