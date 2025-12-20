import { getProjectById } from "@/server-logic/controllers/projectsController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const project = await getProjectById(id);

        return NextResponse.json({ project });
    } catch (error) {
        return handleError(error);
    }
}
