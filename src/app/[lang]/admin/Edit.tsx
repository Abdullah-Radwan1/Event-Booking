"use client";

import React, { startTransition, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "../../../../prisma/src/generated/client";
import { UpdateEvent } from "./actions";
import { toast } from "sonner";

type EditProps = {
  event: Event;
  lang: string;
};

const EditTranslations = {
  en: {
    editEvent: "Edit Event",
    arabicTitle: "Arabic Title",
    englishTitle: "English Title",
    arabicDescription: "Arabic Description",
    englishDescription: "English Description",
    price: "Price",
    saveChanges: "Save Changes",
  },
  ar: {
    editEvent: "تعديل الحدث",
    arabicTitle: "العنوان العربي",
    englishTitle: "العنوان الإنجليزي",
    arabicDescription: "الوصف العربي",
    englishDescription: "الوصف الإنجليزي",
    price: "السعر",
    saveChanges: "حفظ التغييرات",
  },
};

const Edit = ({ event, lang }: EditProps) => {
  const ar = lang === "ar";
  const t = EditTranslations[ar ? "ar" : "en"] ?? EditTranslations.en;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: event.title_ar ?? "",
    title_en: event.title_en ?? "",
    description_ar: event.description_ar ?? "",
    description_en: event.description_en ?? "",
    price: event.price ?? 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    startTransition(async () => {
      await UpdateEvent(event.id, formData, lang)
        .then(() => {
          // optionally show a toast or dialog close here
          toast.success("Event updated successfully");
        })
        .catch((err: any) => {
          console.error("Failed to update event:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const formFields = [
    {
      label: t.arabicTitle,
      id: "title_ar",
      type: "text",
      component: Input,
    },
    {
      label: t.englishTitle,
      id: "title_en",
      type: "text",
      component: Input,
    },
    {
      label: t.arabicDescription,
      id: "description_ar",
      type: "textarea",
      component: Textarea,
    },
    {
      label: t.englishDescription,
      id: "description_en",
      type: "textarea",
      component: Textarea,
    },
    {
      label: t.price,
      id: "price",
      type: "number",
      component: Input,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.editEvent}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {formFields.map(({ label, id, type, component: Component }) => (
            <div key={id} className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={id} className="text-right">
                {label}
              </label>
              <Component
                id={id}
                name={id}
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
                type={type !== "textarea" ? type : undefined}
                rows={type === "textarea" ? 4 : undefined}
                className="col-span-3"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              className="disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {t.saveChanges}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
