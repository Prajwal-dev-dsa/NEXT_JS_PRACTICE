import authOptions from "@/lib/authOptions";
import uploadOnCloudinary from "@/lib/cloudinary";
import { connectToDB } from "@/lib/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as Blob | null;

    let imageUrl = session.user.image ?? null;

    if (file) {
      imageUrl = await uploadOnCloudinary(file);
    }
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name,
        image: imageUrl,
      },
      { new: true }
    );
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
