"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function SignOut() {
  const lang = useParams().lang;
  const ar = lang === "ar";
  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        await signOut();
      }}
      className="text-white hover:bg-red-700 transition-all"
    >
      {ar ? "تسجيل الخروج" : "Sign out"}
    </Button>
  );
}
