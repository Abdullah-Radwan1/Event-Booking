"use client";
import React, { useState } from "react";
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
import { Event } from "@/generated/prisma";

const Edit = ({ event }: { event: Event }) => {
  const [formData, setFormData] = useState({
    title_ar: event.title_ar,
    title_en: event.title_en,
    description_ar: event.description_ar,
    description_en: event.description_en,
    price: event.price,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your update logic here (API call or server action)
    console.log("Updated data:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Arabic Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title_ar" className="text-right">
              Arabic Title
            </label>
            <Input
              id="title_ar"
              name="title_ar"
              value={formData.title_ar || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* English Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title_en" className="text-right">
              English Title
            </label>
            <Input
              id="title_en"
              name="title_en"
              value={formData.title_en || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Arabic Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description_ar" className="text-right">
              Arabic Description
            </label>
            <textarea
              id="description_ar"
              name="description_ar"
              value={formData.description_ar || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
            />
          </div>

          {/* English Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description_en" className="text-right">
              English Description
            </label>
            <textarea
              id="description_en"
              name="description_en"
              value={formData.description_en || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
