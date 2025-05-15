import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "../../../../prisma/db";
import { AdminTranslations } from "../../../../translations/admin";
import Edit from "./Edit";
import Delete from "./Delete";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = async ({ params }: { params: { lang: "en" | "ar" } }) => {
  const { lang } = params;
  const events = await db.event.findMany();
  const translations = AdminTranslations[lang];

  return (
    <div
      className={`container mx-auto py-8 px-4 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">{translations.title}</h1>
        <Link href={`/admin/add`}>
          <Button className="bg-red-500 text-white hover:bg-red-800 transition">
            {translations.add}
          </Button>
        </Link>
      </section>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">
                {translations.headers.arabicTitle}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.englishTitle}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.arabicDesc}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.englishDesc}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.category}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.price}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.edit}
              </TableHead>
              <TableHead className="font-semibold">
                {translations.headers.delete}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title_ar}</TableCell>
                <TableCell className="font-medium w-4">
                  {event.title_en}
                </TableCell>
                <TableCell className="w-4">
                  {event.description_ar?.slice(0, 30) + "..."}
                </TableCell>
                <TableCell className="w-4">
                  {event.description_en?.slice(0, 30) + "..."}
                </TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>
                  <Edit event={event} lang={lang} />
                </TableCell>
                <TableCell>
                  <Delete id={event.id} lang={lang} key={event.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {events.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {translations.noEvents}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
