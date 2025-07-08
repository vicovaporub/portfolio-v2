'use client'

import { useLocale } from "@/hooks/useLocale";
import { getLocalizedText } from "@/lib/base";

// import { useEffect, useState } from "react"

// interface AboutData {
//   id: number
//   text: string
// }

export default function AboutPage() {
  // const [aboutData, setAboutData] = useState<AboutData | null>(null)

  // useEffect(() => {
  //   const getAboutData = async () => {
  //     const response = await fetch('/api/get-about')
  //     const data = await response.json()
  //     setAboutData(data.aboutContent)
  //   }
  //   getAboutData()
  // }, []) 

  const aboutData = {
    id: 1,
    text: 'This is the About page ^^pt-BR:Essa é a página de Sobre'
  }

  const { locale } = useLocale()

  return (
    <div className="p-4">
      <div className="bg-[var(--background-secondary)] rounded border border-[var(--border)] p-6 theme-transition">
        <div className="text-[11px] text-[var(--text-secondary)] font-mono leading-relaxed">
          {getLocalizedText(aboutData.text, locale)}
        </div>
      </div>
    </div>
  );
}
