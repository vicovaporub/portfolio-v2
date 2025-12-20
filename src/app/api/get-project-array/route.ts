import { getProjectsArrayWithTechnologies } from "@/server-logic/controllers/projectsController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const projects = await getProjectsArrayWithTechnologies();

        return NextResponse.json({ projects });
    } catch (error) {
        return handleError(error);
    }
}
