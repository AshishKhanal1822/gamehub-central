import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Please provide email and password" }, { status: 400 });
        }

        // In real app, compare hashed passwords.
        // select('+password') is needed because we set select:false in schema
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = user.password === password; // Standard comparison for demo

        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        // Remove password from response
        user.password = undefined;

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}
