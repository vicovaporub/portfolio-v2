import { getProjectsArray } from "@/backend/controllers/projectsController";
import { NextResponse } from "next/server";

export async function GET() {
    const projects = await getProjectsArray()

    
    projects.forEach(project => {
        project.type = 'project';
    });
    console.log(projects)

    return NextResponse.json({ projects });
}
