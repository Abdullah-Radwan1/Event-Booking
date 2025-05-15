import React from "react";
import { db } from "../../prisma/db";
import EventCard from "./event-card";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

const Events = async ({ lang }: { lang: string }) => {
  // const { lang } = await params;
  const ar = lang === "ar";
  const events = await db.event.findMany({ take: 4 });
  const session = await getServerSession(authOptions);
  const userId = await session?.user?.id;

  const bookings = await db.booking.findMany({
    where: {
      userId,
    },
    include: {
      event: true, // Include the full event details
    },
  });
  const bookedEventIds = bookings.map((booking) => booking.event.id);
  return (
    <>
      <h1 className="text-5xl mt-4 font-bold p-1 bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent ">
        {ar ? "اخر الاحداث" : "Hot Events"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl   w-full  p-6">
        {events.map((event) => (
          <EventCard
            bookedEventIds={bookedEventIds}
            lang={lang}
            {...event}
            key={event.id}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
