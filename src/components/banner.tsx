import Image from "next/image";
import React from "react";
import Link from "next/link";
import "../css/bounce.css";
import { Button } from "./ui/button";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-4 bg-accent rounded-xl shadow-sm animate-slideLeft">
      <div className="flex flex-col max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find your <span className="text-blue-500">people</span>, discover
          <span className="text-blue-500"> interests</span>, and join inspiring
          <span className="text-blue-500"> events</span>
        </h1>

        <p className="text-gray-500 text-lg">
          Connect with like-minded individuals and explore new opportunities in
          your community.
        </p>

        <Link href="/auth/signup">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 p-6 text-lg  hover:shadow-lg">
            Sign Up Now
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Image
          src={"/tech.png"}
          className="rounded-2xl shadow-lg object-cover"
          alt="banner"
          width={450}
          height={450}
          priority
        />
        <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-blue-500 rounded-full opacity-20 z-0 animate-circleMove1"></div>
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-green-600 rounded-full opacity-20 z-0 animate-circleMove2"></div>
      </div>
    </div>
  );
};

export default Banner;
