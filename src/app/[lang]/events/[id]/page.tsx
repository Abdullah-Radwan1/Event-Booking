import React from "react";
import { db } from "../../../../../prisma/db";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { eventRegisterTranslations } from "../../../../../translations/event-translation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

const EventPage = async ({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) => {
  const session = await getServerSession(authOptions);
  const { id, lang } = await params;
  const ar = lang === "ar";
  const t = eventRegisterTranslations[ar ? "ar" : "en"];
  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  const related_events = await db.event.findMany({
    take: 3,
    where: { category: event.category, NOT: { id: event.id } },
  });
  const bookings = await db.booking.findMany({
    where: { userId: session?.user.id },
    select: { eventId: true },
  });

  const bookedEventIds = bookings.map((b) => b.eventId);

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(ar ? "ar-EG" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString(ar ? "ar-EG" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="text-4xl font-bold">
            {ar ? event.title_ar : event.title_en}
          </h1>
          <Link
            href={`/${lang}/events/${event.id}/register`}
            className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
          >
            {t.registerNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Image */}
      {event.image && (
        <div className="relative h-[55vh] mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt="event image"
            fill
            className="object-center"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{t.aboutEvent}</h2>
            <p className="whitespace-pre-line">
              {ar ? event.description_ar : event.description_en}
            </p>
          </div>

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
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-5">{t.eventDetails}</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5" />
                <div>
                  <h3 className="font-medium text-red-400">{t.dateTime}</h3>
                  <p className="font-medium">{formattedDate}</p>
                  <p>{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5" />
                <div>
                  <h3 className="font-medium text-red-400">{t.location}</h3>
                  <p className="font-medium">{t.virtualEvent}</p>
                  <p>{t.linkProvided}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-5 w-5" />
                <div>
                  <h3 className="font-medium text-red-400">{t.attendees}</h3>
                  <p className="font-medium">{t.registered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Register CTA */}
          <div className="border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.registerCardTitle}
            </h2>
            <p className="mb-5">{t.registerCardText}</p>
            <Link href={`/${lang}/events/${event.id}/register`}>
              <Button className="w-full text-white py-3 px-4 rounded-lg font-medium bg-red-600 hover:bg-red-700">
                {t.registerNow}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <div className="my-6">
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
            <EventCard
              bookedEventIds={bookedEventIds}
              lang={lang}
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;

export async function generateStaticParams() {
  const events = await db.event.findMany({
    select: { id: true },
  });

  // You can support both English and Arabic

  return events.flatMap((event) => [
    { id: event.id, lang: "en" },
    { id: event.id, lang: "ar" },
  ]);
}
