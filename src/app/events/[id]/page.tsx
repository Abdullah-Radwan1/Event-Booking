import React from "react";
import { db } from "../../../../prisma/db";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const EventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const event = await db.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }
  const three_events = await db.event.findMany({ take: 3 });
  // Format date and time for display
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
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  event.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : " text-gray-800"
                }`}
              >
                {event.status}
              </span>
            </div>
            <h1 className="text-4xl font-bold  ">{event.title}</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href={`${event.id}/register`}
              className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg  "
            >
              Register Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Event Image */}
      {event.image && (
        <div className="relative h-96  mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="border rounded-2xl p-8 mb-8  shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 ">About this event</h2>
            <div className="prose max-w-none ">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </div>

          {/* Event Schedule (example section) */}
          <div className="border  rounded-2xl p-8  shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 ">Event Schedule</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Registration</h3>
                  <p>9:00 AM - 10:00 AM</p>
                  <p className="mt-2 ">Check-in and welcome coffee</p>
                </div>
              </div>
              {/* Add more schedule items as needed */}
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-6">
          <div className="border  rounded-2xl p-6  shadow-sm">
            <h2 className="text-xl font-semibold mb-5  ">Event Details</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2  rounded-lg">
                  <Calendar className="h-5 w-5 " />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">Date & Time</h3>
                  <p className="font-medium">{formattedDate}</p>
                  <p className="">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2  rounded-lg">
                  <MapPin className="h-5 w-5 " />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">Location</h3>
                  <p className="font-medium">Virtual Event</p>
                  <p className="">Link will be provided after registration</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2  rounded-lg">
                  <Users className="h-5 w-5 " />
                </div>
                <div>
                  <h3 className="font-medium text-red-400">Attendees</h3>
                  <p className="font-medium">150+ registered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Card */}
          <div className="border  rounded-2xl p-6 ">
            <h2 className="text-xl font-semibold mb-3 ">
              Register for this event
            </h2>
            <p className="mb-5 ">Secure your spot now before it's too late!</p>
            <div className="space-y-6">
              <Link href={`${event.id}/register`}>
                <Button className="w-full text-white py-3 px-4 rounded-lg font-medium bg-red-600 hover:bg-red-700  ">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold ">You might also like</h2>
          <Link
            href="/events"
            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {three_events.map((item) => (
            <div
              key={item.id}
              className="border  rounded-xl  hover:shadow-md transition-shadow "
            >
              <div className="h-52 w-full relative mb-4">
                <Image
                  src={item.image || ""}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <section className="px-3 pb-3">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className=" text-sm mb-3">Fri, May 20 · 10:00 AM</p>
                <Link
                  href={`/events/${item.id}`}
                  className="text-red-400 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
