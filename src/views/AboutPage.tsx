'use client'

import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText } from "@/lib/base";
import Markdown from "react-markdown";
import { useContext } from "react"
import { UserContext } from "@/contexts/UserContext";

export default function AboutPage() {
    const { about } = useContext(UserContext);
    const { locale } = useLocale()

    if (!about) {
        return null;
    }

    return (
        <div className="p-4">
            <div className="bg-[var(--background-secondary)] rounded border border-[var(--border)] p-6 theme-transition">
                <div className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
                    <div className="flex flex-col gap-4">
                        <Markdown>
                            {getLocalizedText(about.text, locale)}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
