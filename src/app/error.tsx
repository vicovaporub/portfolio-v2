'use client';
 
import SystemError from "@/components/SystemError";
import { useEffect } from "react";
 
export default function Error({
    error,
    reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
 
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <SystemError error={error} reset={reset} />
        </div>
    );
}