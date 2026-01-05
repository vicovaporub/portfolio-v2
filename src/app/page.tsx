import HomePage from "@/views/HomePage";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-[var(--background)]">
                <LoadingSpinner />
            </div>
        }>
            <HomePage />
        </Suspense>
    );
}
