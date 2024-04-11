"use server";

import { prisma } from "@/app/lib/db";
import { checkSession, getWalletAddress } from "@/app/utils/checkSession";
import { checkTransaction } from "@/app/utils/checkTransaction";

export async function sendVote({ id, hash }: { id: string; hash: string }) {
    //
    if ((await checkSession()) === false) return;

    const hashCount = await prisma.voteLogs.count({
        where: {
            hash,
        },
    });

    if (hashCount > 0) return;

    const walletAddress = await getWalletAddress();
    const transaction = await checkTransaction(hash);
    if (!transaction) throw new Error("Transaction not found.");

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

    await prisma.voteLogs.create({
        data: {
            vote_id: id,
            wallet: walletAddress,
            hash: hash,
        },
    });

    return { updatedData };
}
