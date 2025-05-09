import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";

export async function GET(request: Request) {
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
          {
            title_en: { contains: search, mode: "insensitive" as const },
          },
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

  const events = await db.event.findMany({
    skip,
    take,
    where: baseWhere,
    orderBy: {
      date: "asc", // or 'desc' depending on your preference
    },
  });

  const nextPageEvents = await db.event.findMany({
    skip: skip + take,
    take: 1,
    where: baseWhere,
  });

  const hasMore = nextPageEvents.length > 0;

  return NextResponse.json({ events, hasMore });
}
