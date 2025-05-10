import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title_ar, description_ar, title_en, description_en, date, image } =
      body;

    // Validate required fields
    if (!title_ar || !description_ar || title_en || description_en || !date) {
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
    if (userEventsCount >= 3) {
      return NextResponse.json(
        { error: "You have reached the maximum number of events" },
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

        creatorId: session.user.id as string, // Use session user ID
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
