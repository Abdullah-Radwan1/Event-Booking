"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
} from "./ui/alert-dialog";
import SignOut from "@/lib/auth/SignoutButton";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserMenu() {
  const { lang } = useParams();
  const isArabic = lang === "ar";
  const session = useSession();

  if (session.status === "unauthenticated") {
    return (
      <Link href={`/${lang}/auth/signin`}>
        <Button>{isArabic ? "تسجيل الدخول" : "Sign in"}</Button>
      </Link>
    );
  }

  const isAdmin = session?.data?.user?.role === "ADMIN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`relative flex gap-1 items-center ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {isArabic
            ? `أهلاً ${session.data?.user?.name}`
            : `Hi ${session.data?.user?.name}`}
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      {/* to do dir={isArabic ? "rtl" : "ltr"} */}
      <DropdownMenuContent forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.data?.user?.name} (
              {session.data?.user?.role.toLowerCase()})
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link
              href={`/${lang}/admin`}
              className={`w-full font-semibold text-red-600 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {isArabic ? "لوحة الإدارة" : "Admin Panel"}
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href={`/${lang}/profile`}>
            {isArabic ? "الملف الشخصي" : "Profile"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/${lang}/events`}>
            {isArabic ? "الفعاليات" : "Events"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              {isArabic ? "تسجيل الخروج" : "Sign out"}
            </AlertDialogTrigger>
            <AlertDialogContent dir={isArabic ? "rtl" : "ltr"}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isArabic
                    ? "هل أنت متأكد أنك تريد تسجيل الخروج؟"
                    : "Are you sure you want to sign out?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isArabic
                    ? "سوف تحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك."
                    : "You will need to sign in again to access your account."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {isArabic ? "إلغاء" : "Cancel"}
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <SignOut />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
