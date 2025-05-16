import React from "react";
import { db } from "../../../../../../../prisma/db";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) => {
  const { id, lang } = await params;
  const isArabic = lang === "ar";

  const event = await db.event.findUnique({
    where: { id },
  });
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  if (!event || !id || !lang) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        {isArabic ? "تعذر العثور على الحدث." : "Event not found."}
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(
    isArabic ? "ar-EG" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 animate-bounce" />

      <h1 className="text-2xl md:text-3xl text-green-500 font-bold  mb-2">
        {isArabic ? "تم الحجز بنجاح!" : "Booking Confirmed!"}
      </h1>

      <p className="text-muted-foreground max-w-md mb-6">
        {isArabic
          ? "شكرًا لحجزك. لقد تم تأكيد الحجز بنجاح."
          : "Thank you for your booking. Your reservation is confirmed."}
      </p>

      <div className="bg-muted text-accent-foreground px-6 py-3 rounded-md text-sm font-mono tracking-wide mb-4">
        {isArabic ? "معرف الحجز: " : "Booking ID: "}{" "}
        <span className="font-semibold">{id}</span>
      </div>

      <div className="bg-accent p-6 rounded-md shadow-md w-full max-w-md ">
        <h2 className="text-xl p-1  bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent font-semibold mb-2 ">
          {isArabic ? event.title_ar : event.title_en}
        </h2>
        <p className="text-sm text-muted-foreground mb-1">
          {isArabic ? "تاريخ الحدث: " : "Event Date: "} {formattedDate}
        </p>
        <p className="text-sm text-muted-foreground">
          {isArabic ? event.description_ar : event.description_en}
        </p>
      </div>
      <Link
        href={`/`}
        className={`flex items-center gap-2 text-primary hover:underline transition-all mt-6 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>
          {isArabic ? "العودة إلى الصفحه الرئيسيه" : "Back to home page"}
        </span>
      </Link>
    </div>
  );
};

export default page;
