"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`${props.className} ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {pending ? "Processing..." : children}
    </Button>
  );
}
