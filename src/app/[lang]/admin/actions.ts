"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../../prisma/db";
import { getServerSession } from "next-auth";

async function DeleteEvent(id: string) {
  const session = await getServerSession(); // ✅ moved inside
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.delete({ where: { id } });
}
async function UpdateEvent(id: string, data: any, lang: string) {
  const session = await getServerSession(); // ✅ moved inside
  if (!session) {
    throw new Error("Not authenticated");
  }
  await db.event.update({ where: { id }, data });
  revalidatePath(`/${lang}/admin`); // Re-fresh data
}
export { DeleteEvent, UpdateEvent };
