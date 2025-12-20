import { getProjectById } from "@/server-logic/controllers/projectsController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: { message: "Project ID is required", code: "VALIDATION_ERROR", statusCode: 400 } },
                { status: 400 }
            );
        }

        const project = await getProjectById(id);

        return NextResponse.json({ project });
    } catch (error) {
        return handleError(error);
    }
}
