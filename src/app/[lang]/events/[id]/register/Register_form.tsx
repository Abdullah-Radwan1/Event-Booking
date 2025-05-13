"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";
import { toast } from "sonner";

const Register_form = ({
  isArabic,
  eventId,
}: {
  isArabic: string;
  eventId: string;
}) => {
  const registerForEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, eventId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error(isArabic ? "حدث خطأ أثناء التسجيل" : "Registration failed");
        return;
      }

      toast.success(
        isArabic
          ? "تم تسجيلك بنجاح للحدث"
          : "You have successfully registered for the event"
      );
      redirect(`success`);
    } catch (error) {
      toast.error(isArabic ? "حدث خطأ أثناء المعالجة" : "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={registerForEvent}
      className="space-y-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium  mb-2">
          {isArabic ? "الاسم الكامل" : "Full Name"}
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder={isArabic ? "محمد أحمد" : "John Doe"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2  ">
          {isArabic ? "البريد الإلكتروني" : "Email Address"}
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder={isArabic ? "you@email.com" : "you@email.com"}
        />
      </div>

      <Button className="mx-auto block " type="submit">
        {" "}
        {isArabic ? "إنهاء التسجيل" : "finish Registration"}
      </Button>
    </form>
  );
};

export default Register_form;
