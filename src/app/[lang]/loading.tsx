import React from "react";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Loader className="animate-spin" />{" "}
    </div>
  );
}
