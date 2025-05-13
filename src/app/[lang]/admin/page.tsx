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
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { revalidatePath } from "next/cache";
import Edit from "./Edit";

const AdminPage = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  const ar = lang === "ar";
  const events = await db.event.findMany();
  // Inside your AdminPage component
  async function handleDelete(id: string) {
    "use server"; // Required for server actions
    await db.event.delete({ where: { id } });
    revalidatePath(`/${lang}/admin`); // Re-fresh data
  }
  // Translation strings
  const translations = {
    title: ar ? "إدارة الفعاليات" : "Event Management",
    addNew: ar ? "إضافة فعالية جديدة" : "Add New Event",
    noEvents: ar
      ? "لا توجد فعاليات. قم بإنشاء أول فعالية لك."
      : "No events found. Create your first event.",
    headers: {
      arabicTitle: ar ? "العنوان العربي" : "Arabic Title",
      englishTitle: ar ? "العنوان الإنجليزي" : "English Title",
      arabicDesc: ar ? "الوصف العربي" : "Arabic Description",
      englishDesc: ar ? "الوصف الإنجليزي" : "English Description",
      category: ar ? "الفئة" : "Category",
      price: ar ? "السعر" : "Price",
      actions: ar ? "الإجراءات" : "Actions",
    },
    delete: {
      title: ar
        ? "هل أنت متأكد أنك تريد الحذف؟"
        : "Are you sure you want to delete?",
      description: ar
        ? "سيتم حذف الفعالية بشكل دائم."
        : "The event will be permanently deleted.",
      cancel: ar ? "إلغاء" : "Cancel",
      confirm: ar ? "حذف" : "Delete",
    },
  };

  return (
    <div
      className={`container mx-auto py-8 px-4 ${
        ar ? "text-right" : "text-left"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">{translations.title}</h1>

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
              <TableHead className="font-semibold ">
                {translations.headers.category}
              </TableHead>
              <TableHead className="font-semibold ">
                {translations.headers.price}
              </TableHead>
              <TableHead className="font-semibold ">
                {translations.headers.actions}
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
                  {event.description_ar?.split(" ").slice(0, 4).join(" ") +
                    "..."}
                </TableCell>
                <TableCell className="w-4">
                  {event.description_en?.split(" ").slice(0, 4).join(" ") +
                    "..."}
                </TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Edit event={event} />

                    <AlertDialog>
                      <AlertDialogTrigger className="w-full ">
                        <Trash2 className="h-4 w-4 mx-auto" />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {translations.delete.title}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {translations.delete.description}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter dir="rtl">
                          <AlertDialogCancel>
                            {translations.delete.cancel}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDelete(event.id);
                            }}
                            className="bg-destructive"
                          >
                            {translations.delete.confirm}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
