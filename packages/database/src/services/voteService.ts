import { prisma } from "../client";

const getVotes = async (day: number, type: "color" | "theme") => {
    try {
        const votes = await prisma.vote.findMany({
            where: {
                day: day,
                type: type,
                isDeleted: false,
            },
        });

        const maxCount = votes.reduce((maxItem, currentItem) => {
            if (!maxItem) return currentItem;
            return currentItem.count > maxItem.count ? currentItem : maxItem;
        }, votes[0]);

        if (!maxCount) return;

        if (type === "color") {
            return { votes: votes, maxCountItem: maxCount.value.join(",") };
        }

        if (type === "theme") {
            return { votes: votes, maxCountItem: maxCount.value[0] };
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

const createVote = async ({ type, value, day }: { type: "color" | "theme"; value: string; day: number }) => {
    try {
        if (type === "theme") {
            const vote = await prisma.vote.create({
                data: {
                    type,
                    value: [value],
                    day: day,
                },
            });

            return vote;
        }

        if (type === "color") {
            const vote = await prisma.vote.create({
                data: {
                    type,
                    value: value.split(","),
                    day: day,
                },
            });

            return vote;
        }

        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getVotes, createVote };
