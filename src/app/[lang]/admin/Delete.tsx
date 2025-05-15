"use client";
import React from "react";
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
import { Trash2 } from "lucide-react";

import { DeleteEvent } from "./actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Delete = ({ id, lang }: { id: string; lang: string }) => {
  // Inside your AdminPage component

  const ar = lang === "ar";
  const handleDelete = async function () {
    DeleteEvent(id);
    toast.error(ar ? "تم حذف الفعالية بنجاح" : "Event deleted successfully");
  };
  const DeleteTranslations = {
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
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
          <Trash2 color="white" className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>{DeleteTranslations.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {DeleteTranslations.delete.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter dir="rtl">
          <AlertDialogCancel>
            {DeleteTranslations.delete.cancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive">
            {DeleteTranslations.delete.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
