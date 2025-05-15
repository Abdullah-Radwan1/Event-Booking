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
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Not_Found;
