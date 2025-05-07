import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Event } from "@/generated/prisma";
import Image from "next/image";

interface EventCardProps extends Event {
  // Only the specified props are used now
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  image,
  status,
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border">
      {/* Event Image */}
      <div className="relative h-64 w-full">
        <Image src={image || "/placeholder.jpg"} fill alt={title} />
        {status && (
          <span className="text-white absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-red-600">
            {status}
          </span>
        )}
      </div>

      {/* Event Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>

        <p className="text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        {/* Action Button */}
        <Link href={`/events/${id}`}>
          <button className="w-full mt-2 flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-300 group border hover:bg-accent">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
