"use client";

import { Check, Loader2 } from "lucide-react";
import {cn} from "@/lib/tailwindUtils"

interface StepIndicatorProps {
  status: "pending" | "loading" | "completed";
}

export function StepIndicator({ status }: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "h-10 w-10 rounded-full border-2 flex items-center justify-center",
        status === "pending" && "border-muted",
        status === "loading" && "border-primary",
        status === "completed" && "border-primary bg-primary"
      )}
    >
      {status === "loading" && (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      )}
      {status === "completed" && <Check className="h-5 w-5 text-primary-foreground" />}
    </div>
  );
}