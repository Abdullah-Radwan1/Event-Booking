import React from "react";
import { db } from "../../../../../prisma/db";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translation";
import EventCard from "@/components/event-card";

const EventPage = async ({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) => {
  const ar = (await params).lang === "ar";

  const { id, lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;
  const event = await db.event.findUnique({
    where: { id },
  });
  if (!event) {
    notFound();
  }
  const related_events = await db.event.findMany({
    take: 3,
    where: { category: event.category, NOT: { id: event.id } },
  });
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Event Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">
              {ar ? event.title_ar : event.title_en}
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${lang}/events/${event.id}/register`}
              className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
            >
              {t.registerNow}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Event Image */}
      {event.image && (
        <div className="relative h-96 mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={"event image"}
            fill
            className="object-center"
            priority
          />
        </div>
      )}

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="border rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{t.aboutEvent}</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">
                {ar ? event.description_ar : event.description_en}
              </p>
            </div>
          </div>

          {/* Event Schedule */}
          <div className="border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{t.eventSchedule}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">{t.registration}</h3>
                  <p>9:00 AM - 10:00 AM</p>
                  <p className="mt-2">{t.checkIn}</p>
                </div>
              </div>
              {/* Add more schedule items as needed */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-5">{t.eventDetails}</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">{t.dateTime}</h3>
                  <p className="font-medium">{formattedDate}</p>
                  <p>{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">{t.location}</h3>
                  <p className="font-medium">{t.virtualEvent}</p>
                  <p>{t.linkProvided}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">{t.attendees}</h3>
                  <p className="font-medium">{t.registered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Register Card */}
          <div className="border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.registerCardTitle}
            </h2>
            <p className="mb-5">{t.registerCardText}</p>
            <div className="space-y-6">
              <Link href={`/${lang}/events/${event.id}/register`}>
                <Button className="w-full text-white py-3 px-4 rounded-lg font-medium bg-red-600 hover:bg-red-700">
                  {t.registerNow}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t.relatedEvents}</h2>
          <Link
            href={`/${lang}/events`}
            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
          >
            {t.viewAllEvents}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related_events.map((item) => (
            <EventCard lang={lang} key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
