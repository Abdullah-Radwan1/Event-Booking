import { Globe } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/lib/theme-toggle";

const header = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link href={"/"}>
        <section className="flex items-center justify-between gap-2 ">
          <Image src={"/meet.png"} alt="logo" width={37} height={37} />
          <h1 className="title">Meetup</h1>
        </section>
      </Link>

      <section className="flex items-center justify-between gap-4">
        <Input placeholder="search events" />
        <Link href={"/auth/signin"}>
          <Button>Sign in</Button>
        </Link>
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default header;
