import { getUserData } from '@/backend/controllers/userController';
import { NextResponse } from 'next/server';

export async function GET() {

    const userData = await getUserData()

    const user = userData[0]

    
    return NextResponse.json({ userData: user });
} 