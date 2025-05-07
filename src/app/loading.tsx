import React from "react";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Loader className="animate-spin" />{" "}
    </div>
  );
}
