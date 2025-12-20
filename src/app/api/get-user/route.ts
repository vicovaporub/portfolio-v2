import { getUserData } from "@/server-logic/controllers/userController";
import { NextResponse } from "next/server";
import { handleError } from "@/server-logic/lib/errorHandler";

export async function GET() {
    try {
        const userData = await getUserData();

        if (!userData || userData.length === 0) {
            return NextResponse.json(
                { error: { message: "User not found", code: "NOT_FOUND", statusCode: 404 } },
                { status: 404 }
            );
        }

        const user = userData[0];

        return NextResponse.json({ userData: user });
    } catch (error) {
        return handleError(error);
    }
}
