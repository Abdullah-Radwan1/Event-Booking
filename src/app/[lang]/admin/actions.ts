"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { Event } from "@/generated/prisma";

async function DeleteEvent(id: string) {
  const session = await getServerSession(); // ✅ moved inside
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.delete({ where: { id } });
  revalidateTag("events");
}
async function UpdateEvent(id: string, data: any, lang: string) {
  const session = await getServerSession(); // ✅ moved inside
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.update({ where: { id }, data });
  revalidatePath(`/${lang}/admin`); // Re-fresh data
  revalidateTag("events");
}
export { DeleteEvent, UpdateEvent };
