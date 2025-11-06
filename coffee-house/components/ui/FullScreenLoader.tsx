"use client";
import { Loader2 } from "lucide-react";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-background backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        
      </div>
    </div>
  );
}
