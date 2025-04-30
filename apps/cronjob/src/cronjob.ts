import createImage from "./utils/createImage";
import { getSettings, getVotes, prisma, updateSettingByKey } from "@basevatar/database";
import { serverStatusHelper } from "./utils/serverStatusHelper";
import postNewDayMessage from "./utils/slack/postNewDayMessage";

export async function cronjob() {
    try {
        //
        const imageServerStatus = await serverStatusHelper();
        if (!imageServerStatus) return;

        const date = new Date();
        const now = new Date().getTime();

        const settings = await getSettings();
        if (!settings) return;
        const { day, finish_time, theme, color } = settings;

        if (!finish_time || !day || !theme || !color) {
            console.log({ message: "Setting not found" });
            return;
        }

        if (now > +finish_time) {
            // Get votes
            const colorVotes = await getVotes(+day + 1, "color");
            const themeVotes = await getVotes(+day + 1, "theme");

            const nextColor = colorVotes?.votes.length && colorVotes.maxCountItem ? colorVotes.maxCountItem : color;
            const nextTheme = themeVotes?.votes.length && themeVotes.maxCountItem ? themeVotes.maxCountItem : theme;

            date.setUTCHours(23, 59, 59, 999);
            const new_finish_time = date.getTime() + 1;

            try {
                await prisma.$transaction(async (tx) => {
                    // Update Color
                    if (nextColor !== color) {
                        await updateSettingByKey("color", nextColor, tx);
                    }
                    // Update Theme
                    if (nextTheme !== theme) {
                        await updateSettingByKey("theme", nextTheme, tx);
                    }

                    // Update day
                    await updateSettingByKey("day", (parseInt(day) + 1).toString(), tx);
                    // Update finish time
                    await updateSettingByKey("finish_time", new_finish_time.toString(), tx);
                });
                console.log("Database settings updated successfully via Prisma transaction.");
                // Combine images with this function
                await createImage(+day, color, theme);
                // Post new day message to slack
                await postNewDayMessage(+day + 1, new_finish_time, nextColor, nextTheme);

                console.log(`Successfully completed cycle for day ${day}. Started day ${+day + 1}.`);
            } catch (transactionError) {
                console.error("Prisma transaction failed, settings were not updated:", transactionError);
                return;
            }
        } else {
            console.log("Not yet");
        }
    } catch (e: unknown) {
        console.error(e);
    }
}
