"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CloudinaryUpload from "../../profile/cloudinary";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getMaxDate, getTodayDate } from "@/lib/function";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

enum Category {
  TECHNOLOGY = "TECHNOLOGY",
  BUSINESS = "BUSINESS",
  POLITICAL = "POLITICAL",
}

const page = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const { lang } = useParams();
  const ar = lang === "ar";

  const [title_ar, setTitle_ar] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>(Category.TECHNOLOGY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
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
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setTitle_ar("");
      setTitle_en("");
      setDescription_ar("");
      setDescription_en("");
      setDate("");
      setImage(null);
      setCategory(category);
      toast.success(ar ? "تم إنشاء الحدث بنجاح" : "Event created successfully");
      router.push(`/events`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryTranslations = {
    [Category.TECHNOLOGY]: {
      en: "Technology",
      ar: "تكنولوجيا",
    },
    [Category.BUSINESS]: {
      en: "Business",
      ar: "أعمال",
    },
    [Category.POLITICAL]: {
      en: "Political",
      ar: "سياسي",
    },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className={`bg-accent rounded-lg shadow p-6     `}>
        <h2 className="text-xl font-bold mb-6 text-accent-foreground">
          {ar ? "إضافة حدث جديد" : "Add New Event"}
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
                {ar ? "عنوان الحدث (عربي)" : "Event Title (Arabic)"}
              </label>
              <Input
                type="text"
                value={title_ar}
                onChange={(e) => setTitle_ar(e.target.value)}
                className="w-full "
                placeholder="أدخل عنوان الحدث بالعربية"
                required
                min={10}
                maxLength={30}
              />
            </div>

            {/* English Title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
                {ar ? "عنوان الحدث (انجليزي)" : "Event Title (English)"}
              </label>
              <Input
                type="text"
                value={title_en}
                onChange={(e) => setTitle_en(e.target.value)}
                className="w-full "
                placeholder="Enter event title in English"
                required
                min={10}
                maxLength={30}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Arabic Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
                {ar ? "وصف الحدث (عربي)" : "Event Description (Arabic)"}
              </label>
              <Textarea
                rows={4}
                value={description_ar}
                onChange={(e) => setDescription_ar(e.target.value)}
                className="w-full"
                placeholder="أدخل وصف الحدث بالعربية"
                required
                minLength={25}
                maxLength={150}
              />
            </div>

            {/* English Description */}
            <div>
              <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
                {ar ? "وصف الحدث (انجليزي)" : "Event Description (English)"}
              </label>
              <Textarea
                rows={4}
                value={description_en}
                onChange={(e) => setDescription_en(e.target.value)}
                className="w-full"
                placeholder="Enter event description in English"
                required
                minLength={25}
                maxLength={150}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium mb-2 text-accent-foreground/80"
              >
                {ar ? "تاريخ الحدث" : "Event Date"}
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
            <div>
              <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
                {ar ? "فئة الحدث" : "Event Category"}
              </label>
              <Select
                value={category}
                onValueChange={(value: Category) => setCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={ar ? "اختر الفئة" : "Select category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {ar
                        ? categoryTranslations[cat].ar
                        : categoryTranslations[cat].en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-accent-foreground/80">
                {ar ? "صوره الحدث " : "Event Image"}
              </label>
              <CloudinaryUpload imageUrl={image || ""} setImageUrl={setImage} />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto block "
          >
            {isSubmitting
              ? ar
                ? "جارٍ الإنشاء..."
                : "Creating..."
              : ar
              ? "إضافة الحدث"
              : "Add Event"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default page;
