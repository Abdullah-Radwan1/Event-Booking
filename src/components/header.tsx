// app/components/header.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { ThemeToggle } from "@/lib/theme-toggle";
import UserMenu from "./User-menu"; // Your new client component

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link href="/">
        <section className="flex items-center justify-between gap-2">
          <Image src="/meet.png" alt="logo" width={37} height={37} />
          <h1 className="title">Meetup</h1>
        </section>
      </Link>

      <section className="flex items-center justify-between gap-4">
        <Input placeholder="search events" />
        <UserMenu session={session} /> {/* Pass session as prop */}
        <ThemeToggle />
      </section>
    </nav>
  );
}
