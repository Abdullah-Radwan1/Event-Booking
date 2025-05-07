import React from "react";
import { db } from "../../prisma/db";
import EventCard from "./event-card";

const Events = async () => {
  const events = await db.event.findMany({ take: 4 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4   max-w-7xl p-6">
      {events.map((event) => (
        <EventCard {...event} key={event.id} />
      ))}
    </div>
  );
};

export default Events;
