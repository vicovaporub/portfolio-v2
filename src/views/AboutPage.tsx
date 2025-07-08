'use client'

import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText } from "@/lib/base";
import Markdown from "react-markdown";
import { useEffect, useState } from "react"

interface AboutData {
  id: number
  text: string 
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const { locale } = useLocale()

  useEffect(() => {
    const getAboutData = async () => {
      const response = await fetch('/api/get-about')
      const data = await response.json()
      setAboutData(data.aboutContent)
    }
    getAboutData()
  }, []) 


  return (
    <div className="p-4">
      <div className="bg-[var(--background-secondary)] rounded border border-[var(--border)] p-6 theme-transition">
        <div className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
          <Markdown>
            {getLocalizedText(aboutData?.text ?? '', locale)}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
