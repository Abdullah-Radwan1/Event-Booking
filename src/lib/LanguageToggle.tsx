"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLang = pathname.startsWith("/ar") ? "ar" : "en";
  const newLang = currentLang === "ar" ? "en" : "ar";

  function changeLanguage() {
    // Remove the current language prefix from the pathname
    const currentPathWithoutLang = pathname.replace(/^\/(ar|en)/, "");

    // Preserve the search params
    const searchParamsString = searchParams.toString();
    const queryString = searchParamsString ? `?${searchParamsString}` : "";

    // Redirect to the new language
    router.push(`/${newLang}${currentPathWithoutLang}${queryString}`);
  }

  return (
    <Button
      onClick={changeLanguage}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {newLang === "ar" ? "العربية" : "English"}
    </Button>
  );
}
