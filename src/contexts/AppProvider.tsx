'use client'

import { ThemeProvider } from "./ThemeContext"
import { UserProvider } from "./UserContext"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </UserProvider>
    )
}

export default AppProvider