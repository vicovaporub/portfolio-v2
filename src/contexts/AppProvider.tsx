'use client'

import { LocaleProvider } from "./LocaleContext"
import { ThemeProvider } from "./ThemeContext"
import { UserProvider } from "./UserContext"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocaleProvider>
            <ThemeProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </ThemeProvider>
        </LocaleProvider>
    )
}

export default AppProvider