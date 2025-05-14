import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

const getCachedEvents = unstable_cache(
  async (skip: number, take: number, baseWhere: any) => {
    const events = await db.event.findMany({
      skip,
      take,
      where: baseWhere,
      orderBy: {
        date: "asc",
      },
    });

    const nextPageEvents = await db.event.findMany({
      skip: skip + take,
      take: 1,
      where: baseWhere,
    });

    const hasMore = nextPageEvents.length > 0;

    return { events, hasMore };
  },
  ["events-cache"], // Cache key prefix
  {
    tags: ["events"], // Revalidation tags
  }
);

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const bookings = await db.booking.findMany({
    where: { userId: session?.user.id },
    select: { eventId: true },
  });

  const bookedEventIds = bookings.map((b) => b.eventId);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = (searchParams.get("search") || "").trim();
  const category = searchParams.get("category") || "";
  const skip = (page - 1) * 8;
  const take = 8;

  const baseWhere = {
    AND: [
      {
        OR: [
          { title_ar: { contains: search, mode: "insensitive" as const } },
          {
            description_ar: { contains: search, mode: "insensitive" as const },
          },
          { title_en: { contains: search, mode: "insensitive" as const } },
          {
            description_en: { contains: search, mode: "insensitive" as const },
          },
        ],
      },
      ...(category && category !== "all"
        ? [{ category: category as "TECHNOLOGY" | "BUSINESS" | "POLITICAL" }]
        : []),
    ],
  };

  const { events, hasMore } = await getCachedEvents(skip, take, baseWhere);

  return NextResponse.json({ events, hasMore, bookedEventIds });
}
