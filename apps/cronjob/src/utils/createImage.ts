import { prisma } from "@basevatar/database";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";
import { uploadOutputImage } from "./slackHelpers";
import { createOutput } from "./createOutput";

const DUMMY_OPENSEA_URL = "https://opensea.io";

const createImage = async (day: number, colors: string, theme: string) => {
    try {
        // Fetch selected images for the day from DB
        const dbImages = await prisma.image.findMany({
            where: {
                day: day,
                isSelected: true,
                isDeleted: false,
            },
        });

        // Limit to first 100 images
        const imagesToDownload = dbImages.slice(0, 100);

        // Exit if no images found
        if (imagesToDownload.length === 0) {
            console.log(`No selected images found for day ${day}. Skipping image creation.`);
            return null;
        }

        // Ensure upload directory exists
        const uploadDir = path.resolve(__dirname, "../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Download images in parallel
        const downloadPromises = imagesToDownload.map(async (image, index) => {
            const filename = `${index}.jpg`;
            const baseUrl = process.env.AWS_S3_URL ? `https://${process.env.AWS_S3_URL}` : "http://localhost:3000"; // Use http for local
            const imageUrl = `${baseUrl}/${image.url}`;
            // Attempt download, log error and return null on failure
            return downloadImage(imageUrl, filename).catch((err) => {
                console.error(`Failed to download ${imageUrl}: ${err.message}`);
                return null;
            });
        });

        // Wait for all downloads to finish
        await Promise.all(downloadPromises);
        console.log(`Finished attempting downloads for day ${day}.`);

        // Combine downloaded images
        const combinedImagePath = await combineImages(day);

        // Exit if combination failed
        if (!combinedImagePath) {
            console.warn(`Image combination failed or produced no output for day ${day}. Skipping createOutput.`);
            return null;
        }

        // Create final output (e.g., metadata)
        await createOutput(DUMMY_OPENSEA_URL, day, colors.split(","), theme, ["dummy"]);

        return imagesToDownload; // Return the list of images attempted
    } catch (e) {
        console.error(`Error in createImage for day ${day}:`, e);
        return null;
    }
};

const downloadImage = (url: string, filename: string): Promise<void> => {
    const filePath = path.resolve(__dirname, `../uploads/${filename}`);
    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: "GET",
            responseType: "stream",
            validateStatus: (status) => status >= 200 && status < 300,
        })
            .then((response) => {
                response.data.pipe(writer);

                response.data.on("error", (err: Error) => {
                    console.error(`Error during download stream from ${url}:`, err);
                    writer.close();
                    fs.unlink(filePath, () => {});
                    reject(err);
                });

                writer.on("error", (err: Error) => {
                    console.error(`Error writing file ${filename}:`, err);
                    fs.unlink(filePath, () => {});
                    reject(err);
                });

                writer.on("finish", () => {
                    console.log(`Finished downloading ${filename}`);
                    resolve();
                });
            })
            .catch((error) => {
                console.error(
                    `Failed to initiate download from ${url}:`,
                    error instanceof Error ? error.message : error
                );
                fs.unlink(filePath, () => {});
                reject(error);
            });
    });
};

const combineImages = async (day: number) => {
    const images = [];
    const uploadDir = path.resolve(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
        console.warn(`Uploads directory ${uploadDir} not found. Skipping combineImages for day ${day}.`);
        return null;
    }

    const files = fs.readdirSync(uploadDir);
    let i = 0;
    let j = 0;

    console.log(`Found ${files.length} files in ${uploadDir} for day ${day}.`);

    for (const file of files) {
        if (!file.endsWith(".jpg")) {
            console.warn(`Skipping non-jpg file: ${file}`);
            continue;
        }
        const inputPath = path.resolve(uploadDir, file);
        try {
            const stats = fs.statSync(inputPath);
            if (stats.size === 0) {
                console.warn(`Skipping empty file: ${file}`);
                continue;
            }
        } catch (statError) {
            console.error(`Error accessing file ${file}:`, statError);
            continue;
        }

        images.push({
            input: inputPath,
            top: j * 360,
            left: i * 360,
        });
        i++;

        if (i % 10 === 0) {
            j++;
            i = 0;
        }
    }

    if (images.length === 0) {
        console.warn(`No valid images found to combine for day ${day}. Skipping sharp processing.`);
        fs.rm(uploadDir, { recursive: true, force: true }, (err) => {
            if (err) console.error("Error removing empty uploads directory:", err);
        });
        return null;
    }

    const resultsDir = path.resolve(__dirname, "../results");
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir);
    }

    const outputPath = path.resolve(resultsDir, `day-${day}-output.jpg`);

    console.log(`Compositing ${images.length} images into ${outputPath}`);

    // Create composite image using sharp
    await sharp({
        create: {
            width: 3600,
            height: 3600,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
        },
    })
        .composite(images)
        .toFile(outputPath);

    // Clean up uploads directory
    fs.rm(uploadDir, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error("Error removing uploads directory:", err);
        } else {
            console.log("Uploads directory cleaned successfully after combining.");
        }
    });

    // Upload combined image to server
    try {
        const url =
            (process.env.SERVER_URL ? process.env.SERVER_URL + "/s3-upload" : null) ||
            "http://localhost:3000/s3-upload";
        const uploadApiKey = process.env.UPLOAD_OUTPUT_API_KEY;
        const outputImage = fs.createReadStream(outputPath);

        await axios.post(
            url,
            {
                key: uploadApiKey,
                day,
                file: outputImage,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Image uploaded to server");
    } catch (e) {
        console.log("Error uploading image to server", e);
    }

    // Upload combined image to Slack
    await uploadOutputImage(outputPath, day);
    return outputPath; // Return path of the combined image
};

export default createImage;
