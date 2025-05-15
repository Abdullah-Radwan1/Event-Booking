import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Event } from "@/generated/prisma";
interface EventCardProps extends Event {
  lang: string;
  bookedEventIds: string[] | null; // just the event IDs
}

const EventCard: React.FC<EventCardProps> = ({
  bookedEventIds,
  id,
  title_ar,
  title_en,
  description_ar,
  description_en,
  date,
  image,
  lang,
  price,
}) => {
  const isArabic = lang === "ar";

  const title = isArabic ? title_ar : title_en;
  const description = isArabic ? description_ar : description_en;

  const translations = {
    viewDetails: isArabic ? "عرض التفاصيل" : "View Details",
  };
  const locale = lang === "ar" ? "ar-EG" : "en-US";

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-2 ">
      {/* Event Image */}
      <div className="relative   w-full">
        {bookedEventIds?.includes(id) && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Booked
          </Badge>
        )}
        <Image
          src={image || "technical-event.jpg"}
          width={500}
          height={500}
          alt={image || "Event Image"}
          className="object-cover w-full h-64"
        />
      </div>

      {/* Event Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>

        <p className="text-sm mb-4 line-clamp-2">{description}</p>

        <section className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm  gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(date).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-red-600 font-bold">{price}$</p>
        </section>

        {/* Action Button */}
        <Link href={`/${lang}/events/${id}`}>
          <button className="w-full mt-2 flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-300 group border hover:bg-accent">
            {translations.viewDetails}
            {isArabic ? (
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            ) : (
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
