import { app } from "../index";
import { getTodaysImages } from "../services/imageService";

const todayCommand = async () => {
    app.command("/today", async ({ ack, say }) => {
        //
        await ack();

        const images = await getTodaysImages();

        if (!images || images.length === 0) {
            await say("No images found for today.");
            return;
        }

        await say("Here are the images for today:");
        await say(`Images count: ${images.length}`);
        for (const image of images) {
            await say(`
            - *ID:* ${image.id}
            - *Reviewed:* ${image.isReviewed}
            - *Approved:* ${image.isApproved}
            - *Deleted:* ${image.isDeleted}
            - *URL:* ${image.url}
`);
        }
    });
};

export { todayCommand };
