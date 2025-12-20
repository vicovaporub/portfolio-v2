import { getUserData } from "@/server-logic/controllers/userController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const user = await getUserData();

        return NextResponse.json({ userData: user });
    } catch (error) {
        return handleError(error);
    }
}
