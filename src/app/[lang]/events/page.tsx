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
import { Event } from "../../../../prisma/src/generated/client";
import { EventTranslations } from "../../../../translations/event";
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
  const { lang } = useParams() as { lang: "en" | "ar" };
  const [bookedEventIds, setBookedEventIds] = useState<string[]>([]);
  const translations = EventTranslations[lang];
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    setPage(1);
    setAppliedSearch(search);
    setAppliedCategory(category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    const fetchEvents = async (overridePage = page) => {
      setLoading(true);
      const response = await fetch(
        `/api/search-event?page=${overridePage}&search=${appliedSearch}&category=${appliedCategory}`
      );
      const data = await response.json();
      setEvents(data.events);
      setHasMore(data.hasMore);
      setBookedEventIds(data.bookedEventIds);
      setLoading(false);
    };
    fetchEvents();
  }, [page, appliedSearch, appliedCategory]);

  return (
    <div className="p-8 container m-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {translations.title}
      </h1>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col sm:flex-row  justify-center gap-4 w-full sm:w-[60%] lg:w-[40%] mx-auto">
        <Input
          type="text"
          placeholder={translations.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="sm:w-[50%] "
        />
        <Button
          variant={"outline"}
          onClick={handleSubmit}
          className={`sm:w-[25%] flex ${
            lang === "ar" ? "justify-end" : "justify-start"
          }`}
        >
          {translations.search}
        </Button>
        <Select
          dir={lang === "ar" ? "rtl" : "ltr"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg p-4">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 items-stretch">
          {events.map((event) => (
            <EventCard
              bookedEventIds={bookedEventIds}
              lang={lang}
              key={event.id}
              {...event}
            />
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
