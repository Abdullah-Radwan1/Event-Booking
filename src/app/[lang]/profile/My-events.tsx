import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import { db } from "../../../../prisma/db";

import React from "react";
import EventCard from "@/components/event-card";

const My_events = async ({ lang }: { lang: string }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <p className="text-center text-muted-foreground">
        Please log in to view your events.
      </p>
    );
  }

  const my_events = await db.booking.findMany({
    where: { userId: session.user.id },
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });

  if (my_events.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-muted-foreground">
        You haven&apos;t booked any events yet.
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-4xl font-semibold text-center bg-gradient-to-r from-blue-700 to-red-500 bg-clip-text text-transparent ">
        My Events
      </h1>
      <div className="mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2  gap-6">
        {my_events.map(({ event }) => (
          <EventCard
            lang={lang}
            bookedEventIds={null}
            key={event.id}
            {...event}
          />
        ))}
      </div>
    </section>
  );
};

export default My_events;
