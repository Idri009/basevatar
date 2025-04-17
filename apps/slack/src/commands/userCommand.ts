import { getUserImages } from "@basevatar/database";
import { app } from "../index";

const userCommand = async () => {
    app.command("/user", async ({ command, ack, say }) => {
        //
        await ack();
        const id = command.text;

        const userImages = await getUserImages(id);

        if (!userImages) {
            await say("Unable to retrieve user information.");
            return;
        }

        const countImages = userImages.length;

        if (!countImages) {
            await say("No images found for this user.");
            return;
        }

        const images = userImages.map((image) => {
            return {
                day: image.day,
                url: `https://${process.env.AWS_S3_URL}/${image.url}`,
                isReviewed: image.isReviewed,
                isApproved: image.isSelected,
                isDeleted: image.isDeleted,
            };
        });

        await say(`
        User: ${id}
        - *Images:* ${countImages}
        - *Image Details:*
        ${images.map((image) => {
            return `
            - *Day:* ${image.day}
            - *URL:* ${image.url}
            - *Reviewed:* ${image.isReviewed}
            - *Approved:* ${image.isApproved}
            - *Deleted:* ${image.isDeleted}
            `;
        })}
        `);
    });
};

export { userCommand };
