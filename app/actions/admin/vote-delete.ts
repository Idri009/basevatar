"use server";

import { prisma } from "@/app/lib/db";
import { isAdmin } from "@/app/utils/sessionHelpers";
import { redirect } from "next/navigation";

export async function voteDelete(id: string, day: string) {
    //
    if (!(await isAdmin())) return;

    await prisma.votes.delete({
        where: {
            id: id,
        },
    });

    redirect("/admin/votes?day=" + day);
}
