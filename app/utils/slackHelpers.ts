import { WebClient } from "@slack/web-api";
const token = process.env.SLACK_BOT_TOKEN;
const cronjobConservationId = "C078QPSCK6W";

const postNewSavedImage = async (imageUrl: string, userAddress: string, day: string) => {
    const web = new WebClient(token);

    try {
        const result = await web.chat.postMessage({
            text: `New saved image from ${userAddress} on *day ${day}*:
${imageUrl}
            `,
            channel: cronjobConservationId,
        });

        console.log(`Successfully send message ${result.ts} in conversation ${cronjobConservationId}`);
    } catch (e) {
        console.error(e);
    }
};

export { postNewSavedImage };
