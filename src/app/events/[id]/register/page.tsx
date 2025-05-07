import React from "react";
import { db } from "../../../../../prisma/db";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { SubmitButton } from "./Submit-button"; // Create this component

const RegisterPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const event = await db.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const registerForEvent = async (formData: FormData) => {
    "use server";
    // Handle registration logic here
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    console.log(`Registering ${name} (${email}) for event ${event.id}`);
    // Add your actual registration logic (e.g., database update)
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Register for {event.title}
          </h1>
          <p className="text-gray-600 mb-8">
            Complete the form below to secure your spot
          </p>

          <form action={registerForEvent} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="pt-4">
              <SubmitButton className="w-full bg-red-700 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Complete Registration
              </SubmitButton>
            </div>
          </form>
          <div className="bg-gray-50 rounded-xl p-6 border mt-10 border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Need help?</h3>
            <p className="text-gray-600 text-sm">
              Contact us at{" "}
              <a href="mailto:support@example.com" className="text-indigo-600">
                support@example.com
              </a>{" "}
              for any questions about registration.
            </p>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Event Summary
            </h2>
            {event.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {event.description}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Event Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Date & Time</h3>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Location</h3>
                  <p className="font-medium">Virtual Event</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Registration</h3>
                  <p className="font-medium">Open to public</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
