"use server";
import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/app/lib/db";
import { getSession } from "@/app/utils/sessionHelpers";
import { postNewSlackMessage } from "@/app/utils/slackHelpers";

export async function uploadImageToServer(data: string) {
    try {
        const base64Image = data.split(";base64,").pop();
        if (!base64Image) return;
        const settings = await prisma.settings.findMany();
        const day = settings.find((setting) => setting.key === "day");
        const session = await getSession();
        if (!session || !day) return;
        const userAddress = session.address;
        const userHasAlreadyUploaded = await checkIfUserHasAlreadyUploaded(+day.value, userAddress);
        if (userHasAlreadyUploaded) return;
        //create day folder
        const dayFolder = path.join(process.cwd(), "public", "images", day.value);
        await fs.mkdir(dayFolder, { recursive: true });
        const imagePath = path.join(process.cwd(), "public", "images", day.value, `${uuidv4()}.jpg`);
        await fs.writeFile(imagePath, base64Image, "base64");
        const url = `/images/${day.value}/${path.basename(imagePath)}`;

        await saveToDatabase(+day.value, url, userAddress);
        //slack message
        const slackConservationId = "C078QPSCK6W";
        await postNewSlackMessage(
            slackConservationId,
            `New saved image from ${userAddress} on *day ${day.value}*:
${process.env.NEXT_PUBLIC_BASE_URL + url}
            `
        );

        return url;
    } catch (e) {
        console.error(e);
    }
}

const saveToDatabase = async (day: number, url: string, address: string, isSelected: boolean = true) => {
    try {
        await prisma.images.create({
            data: {
                day,
                url,
                address,
                isSelected,
            },
        });
    } catch (e) {
        console.error(e);
    }
};

export const checkIfUserHasAlreadyUploaded = async (day: number, address: string) => {
    try {
        if (!day || !address) return false;
        const image = await prisma.images.findFirst({
            where: {
                day,
                address,
            },
        });
        return image;
    } catch (e) {
        console.error(e);
    }
};
