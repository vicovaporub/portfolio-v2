import { getProjectsArrayWithTechnologies } from "@/server-logic/controllers/projectsController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const projects = await getProjectsArrayWithTechnologies();

        projects.sort((a, b) => b.number - a.number);
        projects.forEach((project) => {
            project.type = "project";
        });

        return NextResponse.json({ projects });
    } catch (error) {
        return handleError(error);
    }
}
