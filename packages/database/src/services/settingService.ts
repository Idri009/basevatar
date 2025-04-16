import { prisma } from "../client";

const getSettings = async () => {
    try {
        const settings = await prisma.setting.findMany();

        const result = {} as Record<string, string | undefined>;

        settings.forEach((setting) => {
            result[setting.key] = setting.value;
        });

        return {
            day: result.day,
            finish_time: result.finish_time,
            theme: result.theme,
            color: result.color,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};

const updateSettings = async (id: string, value: string): Promise<boolean> => {
    try {
        await prisma.setting.update({
            where: { id },
            data: { value },
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const updateSettingByKey = async (key: string, value: string): Promise<boolean> => {
    try {
        const setting = await prisma.setting.findFirst({
            where: { key },
        });

        if (!setting) {
            console.error(`Setting with key '${key}' not found`);
            return false;
        }

        await prisma.setting.update({
            where: { id: setting.id },
            data: { value },
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export { getSettings, updateSettings, updateSettingByKey };
