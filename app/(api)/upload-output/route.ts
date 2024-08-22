import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const GET = async (req: NextRequest) => {
    return NextResponse.json({ message: "Hello world!" });
};

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const apiKey = formData.get("key");
        const file = formData.get("file") as Blob;
        const day = formData.get("day");

        if (apiKey !== process.env.UPLOAD_OUTPUT_API_KEY) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (!file || file.size === 0) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        if (!day || isNaN(Number(day))) {
            return NextResponse.json({ message: "Invalid or missing day parameter" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        //create output folder if it doesn't exist
        const outputFolder = path.join(process.cwd(), "public", "outputs");
        await fs.mkdir(outputFolder, { recursive: true });

        const fileName = `output-day-${day}.jpg`;
        const filePath = path.join(process.cwd(), "public", "outputs", fileName);

        try {
            await fs.writeFile(filePath, buffer);
        } catch (error) {
            return NextResponse.json({ message: "File upload failed" }, { status: 500 });
        }

        return NextResponse.json({
            message: "File uploaded successfully",
            fileName,
            filePath,
        });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
};
