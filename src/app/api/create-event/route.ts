import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import {  revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title_ar,
      description_ar,
      title_en,
      description_en,
      date,
      image,
      category,
    } = body;

    // Validate required fields
    if (
      !title_ar ||
      !description_ar ||
      !title_en ||
      !description_en ||
      !date ||
      !category
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate date format if needed
    if (isNaN(new Date(date).getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }
    //make  the  user have only 3 events
    const userEventsCount = await db.event.count({
      where: { creatorId: session.user.id },
    });
    if (userEventsCount >= 1) {
      return NextResponse.json(
        { message: "You have reached the maximum number of events" },
        { status: 400 }
      );
    }
    const event = await db.event.create({
      data: {
        title_ar,
        title_en,
        description_ar,
        description_en,
        date: new Date(date), // Ensure proper date format
        image: image || null, // Make image optional
        category, // Use session user ID
        creatorId: session.user.id, // 🔥 THIS IS MISSING!
      },
    });
    revalidateTag(`events`);

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
