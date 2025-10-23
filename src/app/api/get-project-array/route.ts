import { getProjectsArray } from "@/backend/controllers/projectsController";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await getProjectsArray();

  projects.sort((a, b) => b.number - a.number);
  projects.forEach((project) => {
    project.type = "project";
  });

  return NextResponse.json({ projects });
}
