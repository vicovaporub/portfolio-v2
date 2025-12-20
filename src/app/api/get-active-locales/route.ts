import { getActiveLocales } from "@/server-logic/controllers/localesController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const locales = await getActiveLocales();

        return NextResponse.json({ activeLocales: locales });
    } catch (error) {
        return handleError(error);
    }
}
