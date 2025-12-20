import { getAboutContent } from "@/server-logic/controllers/aboutController";
import { NextResponse } from "next/server";

export async function GET() {
  const aboutContent = await getAboutContent();

  return NextResponse.json({ aboutContent: aboutContent });
}
