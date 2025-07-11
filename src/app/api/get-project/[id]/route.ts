import { getProjectById } from "@/backend/controllers/projectsController";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const project = await getProjectById(id);

    return NextResponse.json({ project });
}