"use server";
import { prisma } from "@/app/lib/db";

const fetchVotes = async ({ param }: { param: string }) => {
    "use server";
    try {
        const settings = await prisma.settings.findFirst({
            where: {
                key: "day",
            },
        });

        let day = param ? (parseInt(param) > 0 ? param : "1") : (settings?.value as string);

        const votes = await prisma.votes.findMany({
            where: {
                day: parseInt(day),
                isDeleted: false,
            },
            orderBy: {
                id: "asc",
            },
        });

        return {
            votes,
            day,
            settings,
            error: false,
        };
    } catch (e: unknown) {
        return {
            votes: [],
            day: "1",
            settings: null,
            error: true,
        };
    }
};

export default fetchVotes;
