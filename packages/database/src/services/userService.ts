import { Image } from "@prisma/client";
import { prisma } from "../client";

const getUserImages = async (walletId: string): Promise<Image[] | null> => {
    try {
        const images = await prisma.image.findMany({
            where: {
                address: walletId,
            },
        });

        return images;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getUserImages };
