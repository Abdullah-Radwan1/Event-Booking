import React from "react";
import { db } from "../../../../../../prisma/db";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import { SubmitButton } from "./Submit-button";

const RegisterPage = async ({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) => {
  const { id, lang } = await params;
  const isArabic = lang === "ar";

  const event = await db.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(
    lang === "ar" ? "ar-EG" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const registerForEvent = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    console.log(`Registering ${name} (${email}) for event ${event.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isArabic
              ? `التسجيل في ${event.title_ar}`
              : `Register for ${event.title_en}`}
          </h1>
          <p className="text-gray-600 mb-8">
            {isArabic
              ? "أكمل النموذج أدناه لحجز مكانك"
              : "Complete the form below to secure your spot"}
          </p>

          <form
            action={registerForEvent}
            className="space-y-6"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {isArabic ? "الاسم الكامل" : "Full Name"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={isArabic ? "محمد أحمد" : "John Doe"}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {isArabic ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={isArabic ? "you@email.com" : "you@email.com"}
              />
            </div>

            <div className="pt-4">
              <SubmitButton className="w-full bg-red-700 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                {isArabic ? "أكمل التسجيل" : "Complete Registration"}
              </SubmitButton>
            </div>
          </form>

          <div className="bg-gray-50 rounded-xl p-6 border mt-10 border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">
              {isArabic ? "هل تحتاج مساعدة؟" : "Need help?"}
            </h3>
            <p className="text-gray-600 text-sm">
              {isArabic ? "تواصل معنا عبر " : "Contact us at "}
              <a href="mailto:support@example.com" className="text-indigo-600">
                support@example.com
              </a>{" "}
              {isArabic
                ? "لأي استفسار بخصوص التسجيل."
                : "for any questions about registration."}
            </p>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {isArabic ? "ملخص الحدث" : "Event Summary"}
            </h2>

            {event.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={event.image}
                  alt={event.title_ar || "Event Image"}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <h3 className="text-lg font-medium text-gray-900">
              {isArabic ? event.title_ar : event.title_en}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {isArabic ? event.description_ar : event.description_en}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {isArabic ? "تفاصيل الحدث" : "Event Details"}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">
                    {isArabic ? "التاريخ والوقت" : "Date & Time"}
                  </h3>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">
                    {isArabic ? "الموقع" : "Location"}
                  </h3>
                  <p className="font-medium">
                    {isArabic ? "فعالية افتراضية" : "Virtual Event"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">
                    {isArabic ? "التسجيل" : "Registration"}
                  </h3>
                  <p className="font-medium">
                    {isArabic ? "مفتوح للجميع" : "Open to public"}
                  </p>
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
