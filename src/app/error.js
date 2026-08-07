// app/error.js
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
//   useEffect(() => {
//     // Log the error to your monitoring service (or console for now)
//     console.error("App error boundary caught:", error);
//   }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-default-500 mb-2">
          An unexpected error occurred while loading this page.
        </p>

        {/* Optional: show error message in dev */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2 mb-6 font-mono break-words">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Button
            onClick={() => reset()}
            startContent={<RefreshCw className="w-4 h-4" />}
            className="bg-[#4F46E5] text-white font-medium"
            radius="full"
            size="lg"
          >
            Try Again
          </Button>
          <Link  href="/">
            <Button
           
            startContent={<Home className="w-4 h-4" />}
            variant="bordered"
            radius="full"
            size="lg"
            className="border-[#4F46E5]/30 text-foreground"
          >
            Back to Home
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}