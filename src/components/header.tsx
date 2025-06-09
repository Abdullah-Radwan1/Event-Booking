// app/components/header.tsx
import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/lib/theme-toggle";
import UserMenu from "./User-menu";
import { LanguageToggle } from "@/lib/LanguageToggle";
import { Suspense } from "react";

export default function Header() {
  return (
    <nav className="flex border-b shadow-sm items-center justify-around flex-wrap gap-y-3 py-2 px-6">
      <Link href="/">
        <section className="flex items-center justify-between gap-2">
          <Image src="/meet.png" alt="logo" width={37} height={37} />
          <h1 className="title">Meetup</h1>
        </section>
      </Link>

      <section className="flex items-center justify-between gap-4">
        <UserMenu /> {/* No need to pass session */}
        <ThemeToggle />
        <Suspense fallback={null}>
          <LanguageToggle />
        </Suspense>
      </section>
    </nav>
  );
}
