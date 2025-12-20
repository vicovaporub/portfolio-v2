import { getActiveLocales } from "@/server-logic/controllers/localesController";
import { NextResponse } from "next/server";

export async function GET() {
  const locales = await getActiveLocales();

  return NextResponse.json({ activeLocales: locales });
}
