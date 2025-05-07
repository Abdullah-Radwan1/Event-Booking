import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Not_Found = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <div className="w-16 h-1 bg-primary my-6"></div>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved, deleted, or never existed.
      </p>
      <Link href="/">
        <Button size="lg" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Not_Found;
