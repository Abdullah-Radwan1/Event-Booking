import { getServerSession } from "next-auth";
import { db } from "../../../../prisma/db";
import { authOptions } from "@/lib/auth/auth-options";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.name === null || body.email === null) {
    return new Response("Missing name or email", { status: 400 });
  }
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const event = await db.event.findUnique({
    where: { id: body.eventId },
  });
  if (!event) {
    return new Response("Event not found", { status: 404 });
  }
  const userId = session.user.id as string;
  const userAlreadyRegistered = await db.booking.findFirst({
    where: {
      userId,
      eventId: event.id,
    },
  });
  if (userAlreadyRegistered) {
    return NextResponse.json(
      { message: "User already registered" },
      { status: 400 }
    );
  }
  const createdBooking = await db.booking.create({
    data: {
      eventId: event.id,
      userId,
    },
  });
  return new Response(JSON.stringify(createdBooking), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
