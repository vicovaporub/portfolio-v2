import { createContext } from "react";

const LocaleContext = createContext<{ locale: string }>({ locale: 'en' })

