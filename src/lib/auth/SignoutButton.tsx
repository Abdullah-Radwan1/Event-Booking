"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function SignOut() {
  const lang = useParams().lang;
  const ar = lang === "ar";
  const handleSignOut = async () => {
    // Clear cookie manually
    document.cookie = "authenticated=; Max-Age=0; path=/;";

    // Call next-auth signOut
    await signOut({ callbackUrl: "/auth/signin" });
  };
  return (
    <Button
      variant={"destructive"}
      onClick={handleSignOut}
      className="text-white hover:bg-red-700 transition-all"
    >
      {ar ? "تسجيل الخروج" : "Sign out"}
    </Button>
  );
}
