"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CloudinaryUpload from "./cloudinary";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getMaxDate, getTodayDate } from "@/lib/function";

const EventForm = ({ lang }: { lang: string }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const isArabic = lang === "ar";

  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  if (!isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title_ar,
          title_en,
          description_en,
          description_ar,
          date,
          image,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setTitle_ar("");
      setTitle_en("");
      setDescription_ar("");
      setDescription_en("");
      setDate("");
      setImage(null);
      toast.success(
        isArabic ? "تم إنشاء الحدث بنجاح" : "Event created successfully"
      );
    } catch (err: any) {
      toast.error(err.message);
      setError(isArabic ? "فشل إنشاء الحدث" : "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-accent rounded-lg shadow p-6`}>
      <h2 className="text-xl font-bold mb-6 text-accent-foreground">
        {isArabic ? "إضافة حدث جديد" : "Add New Event"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
              العنوان بالعربية
            </label>
            <Input
              type="text"
              value={title_ar}
              onChange={(e) => setTitle_ar(e.target.value)}
              className="w-full "
              placeholder="أدخل عنوان الحدث بالعربية"
              required
              maxLength={30}
            />
          </div>

          {/* English Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
              Event Title (English)
            </label>
            <Input
              type="text"
              value={title_en}
              onChange={(e) => setTitle_en(e.target.value)}
              className="w-full "
              placeholder="Enter event title in English"
              required
              maxLength={30}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
              الوصف بالعربية
            </label>
            <Textarea
              rows={4}
              value={description_ar}
              onChange={(e) => setDescription_ar(e.target.value)}
              className="w-full"
              placeholder="أدخل وصف الحدث بالعربية"
              required
              maxLength={150}
            />
          </div>

          {/* English Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
              Description (English)
            </label>
            <Textarea
              rows={4}
              value={description_en}
              onChange={(e) => setDescription_en(e.target.value)}
              className="w-full"
              placeholder="Enter event description in English"
              required
              maxLength={150}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium mb-2 text-accent-foreground/80"
          >
            {isArabic ? "تاريخ الحدث" : "Event Date"}
          </label>
          <Input
            type="datetime-local"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
            required
            min={getTodayDate()}
            max={getMaxDate()}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium mb-2 text-accent-foreground/80"
          >
            {isArabic ? "صورة الحدث" : "Event Image"}
          </label>
          <CloudinaryUpload imageUrl={image || ""} setImageUrl={setImage} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full ">
          {isSubmitting
            ? isArabic
              ? "جارٍ الإنشاء..."
              : "Creating..."
            : isArabic
            ? "إضافة الحدث"
            : "Add Event"}
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
