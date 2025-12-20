import { getUserData } from "@/server-logic/controllers/userController";
import { NextResponse } from "next/server";

export async function GET() {
  const userData = await getUserData();

  const user = userData[0];

  return NextResponse.json({ userData: user });
}
