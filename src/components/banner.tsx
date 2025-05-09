import Image from "next/image";
import React from "react";
import Link from "next/link";
import "../css/bounce.css";
import { Button } from "./ui/button";

const Banner = ({ lang }: { lang: string }) => {
  const isArabic = lang === "ar";

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-4 bg-accent rounded-xl shadow-sm animate-slideLeft ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-col max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {isArabic ? (
            <>
              اعثر على <span className="text-red-700">أشخاص</span> يشاركونك
              <span className="text-red-700"> الاهتمامات</span> وانضم إلى
              <span className="text-red-700"> فعاليات ملهمة</span>
            </>
          ) : (
            <>
              Find your <span className="text-red-700">people</span>, discover
              <span className="text-red-700"> interests</span>, and join
              inspiring
              <span className="text-red-700"> events</span>
            </>
          )}
        </h1>

        <p className="text-accent-foreground text-lg">
          {isArabic
            ? "تواصل مع أشخاص يشاركونك الاهتمامات واستكشف فرصًا جديدة في مجتمعك."
            : "Connect with like-minded individuals and explore new opportunities in your community."}
        </p>

        <Link className="w-fit" href="/auth/signup">
          <Button className="bg-red-700 text-white hover:bg-red-600 p-6 text-lg transition hover:shadow-lg">
            {isArabic ? "سجل الآن" : "Sign Up Now"}
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Image
          src={"/tech.png"}
          className="rounded-2xl shadow-lg object-cover"
          alt="banner"
          width={450}
          height={450}
          priority
        />
        <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-blue-500 rounded-full opacity-20 z-0 animate-circleMove1"></div>
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-green-600 rounded-full opacity-20 z-0 animate-circleMove2"></div>
      </div>
    </div>
  );
};

export default Banner;
