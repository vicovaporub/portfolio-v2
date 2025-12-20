import { getAboutContent } from "@/server-logic/controllers/aboutController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const aboutContent = await getAboutContent();

        return NextResponse.json({ aboutContent: aboutContent });
    } catch (error) {
        return handleError(error);
    }
}
