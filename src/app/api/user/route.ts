import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "@/lib/authOptions";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(session.user.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
