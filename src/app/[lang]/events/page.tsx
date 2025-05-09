"use client";

import EventCard from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/generated/prisma";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const [hasMore, setHasMore] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";
  const [loading, setLoading] = useState(true);

  const translations = {
    title: ar ? "الأحداث" : "Events",
    searchPlaceholder: ar ? "ابحث عن الأحداث..." : "Search events...",
    filterPlaceholder: ar ? "الفئة" : "Category",
    noEvents: ar ? "لا توجد أحداث." : "No events found.",
    price: ar ? "السعر" : "Price",
    previous: ar ? "السابق" : "Previous",
    next: ar ? "التالي" : "Next",
    search: ar ? "بحث" : "Search",
    categories: {
      all: ar ? "الكل" : "All",
      technology: ar ? "تكنولوجيا" : "Technology",
      business: ar ? "أعمال" : "Business",
      political: ar ? "سياسة" : "Political",
    },
  };

  const fetchEvents = async (overridePage = page) => {
    setLoading(true);
    const response = await fetch(
      `/api/search-event?page=${overridePage}&search=${appliedSearch}&category=${appliedCategory}`
    );
    const data = await response.json();
    setEvents(data.events);
    setHasMore(data.hasMore);
    setLoading(false);
  };

  const handleSubmit = () => {
    setPage(1);
    setAppliedSearch(search);
    setAppliedCategory(category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    fetchEvents();
  }, [page, appliedSearch, appliedCategory]);

  return (
    <div className="p-8 container m-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translations.title}
      </h1>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[60%] lg:w-[40%] m-auto">
        <Input
          type="text"
          placeholder={translations.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full sm:w-[50%] "
        />
        <Button
          variant={"outline"}
          onClick={handleSubmit}
          className="w-full sm:w-[25%] "
        >
          {translations.search}
        </Button>
        <Select
          dir={ar ? "rtl" : "ltr"}
          onValueChange={(value) => {
            setCategory(value);
            setPage(1);
            setAppliedSearch(search);
            setAppliedCategory(value);
          }}
          value={category}
        >
          <SelectTrigger className="w-full sm:w-[25%]">
            <SelectValue placeholder={translations.filterPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.categories.all}</SelectItem>
            <SelectItem value="TECHNOLOGY">
              {translations.categories.technology}
            </SelectItem>
            <SelectItem value="BUSINESS">
              {translations.categories.business}
            </SelectItem>
            <SelectItem value="POLITICAL">
              {translations.categories.political}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Event List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg p-4">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {events.map((event) => (
            <EventCard lang={lang} key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{translations.noEvents}</p>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <Button
          variant={"outline"}
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          {translations.previous}
        </Button>
        <Button
          disabled={!hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          variant={"outline"}
        >
          {translations.next}
        </Button>
      </div>
    </div>
  );
}
