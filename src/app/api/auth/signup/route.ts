import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { email, password, username } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        // In a real app, hash password here using bcrypt
        const user = await User.create({
            email,
            password, // Storing plain text for this demo (should be hashed!)
            username,
        });

        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}
