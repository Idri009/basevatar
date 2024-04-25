"use server";

import { prisma } from "@/app/lib/db";
import { isAdmin } from "@/app/utils/sessionHelpers";
import { redirect } from "next/navigation";

export async function faqDelete(id: string) {
    //
    if (!(await isAdmin())) return;

    try {
        await prisma.faq.update({
            where: {
                id: id,
            },
            data: {
                isDeleted: true,
            },
        });
    } catch (e) {
        console.log(e);
    }

    redirect("/admin/faq");
}
