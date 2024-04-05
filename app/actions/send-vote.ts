"use server";

import { prisma } from "@/app/db";

export async function sendVote({ id }: { id: string }) {
    const updatedData = await prisma.votes.update({
        where: {
            id,
        },
        data: {
            count: {
                increment: 1,
            },
        },
    });

    return updatedData;
}
