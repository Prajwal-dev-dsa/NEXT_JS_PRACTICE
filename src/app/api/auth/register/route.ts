import { connectToDB } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    await connectToDB();
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    if (password.length < 3) {
      return NextResponse.json(
        { error: "Password must be at least 3 characters long" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Register: Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
