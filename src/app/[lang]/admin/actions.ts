"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../../../../prisma/db";
import { getServerSession } from "next-auth";
const session = await getServerSession();
async function DeleteEvent(id: string) {
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.delete({ where: { id } });
  revalidateTag("events");
}
async function UpdateEvent(id: string, data: any, lang: string) {
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.update({ where: { id }, data });
  revalidatePath(`/${lang}/admin`); // Re-fresh data
  revalidateTag("events");
}
export { DeleteEvent, UpdateEvent };
