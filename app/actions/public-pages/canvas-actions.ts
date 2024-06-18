"use server";
import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/app/lib/db";
import { getSession } from "@/app/utils/sessionHelpers";

export async function uploadImageToServer(data: string) {
    const base64Image = data.split(";base64,").pop();
    if (!base64Image) return;
    const settings = await prisma.settings.findMany();
    const day = settings.find((setting) => setting.key === "day");
    const session = await getSession();
    if (!session || !day) return;
    const userAddres = session.address;
    //create day folder
    const dayFolder = path.join(process.cwd(), "public", "images", day.value);
    await fs.mkdir(dayFolder, { recursive: true });
    const imagePath = path.join(process.cwd(), "public", "images", day.value, `${uuidv4()}.jpg`);
    await fs.writeFile(imagePath, base64Image, "base64");
    const url = `/images/${day.value}/${path.basename(imagePath)}`;

    //save image to db
    await prisma.images.create({
        data: {
            day: +day.value,
            url,
            address: userAddres,
            isSelected: true,
        },
    });

    return url;
}
