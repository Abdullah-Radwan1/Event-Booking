import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import { db } from "../../../../prisma/db";
import Image from "next/image";
import { getTodayDate, getMaxDate, formatDateTimeLocal } from "@/lib/function";
import React from "react";

const My_events = async () => {
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
        You haven't booked any events yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {my_events.map(({ event }) => (
        <div
          key={event.id}
          className="bg-accent rounded-xl overflow-hidden shadow border border-border"
        >
          {event.image && (
            <Image
              src={`${event.image}`}
              alt={event.title_en || "Event Image"}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-accent-foreground">
              {event.title_en}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description_en}
            </p>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Date:</span>{" "}
              {formatDateTimeLocal(new Date(event.date))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm px-2 py-1 bg-muted text-muted-foreground rounded">
                {event.category}
              </span>
              <span className="text-sm font-medium text-primary">
                ${event.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default My_events;
