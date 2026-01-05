'use client'

import { LocaleProvider } from "@/contexts/LocaleContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { UserProvider, AboutData } from "@/contexts/UserContext"
import { User } from "@/types/user"
import { Project } from "@/types/project"
import { Locale } from "@/types/locale"
import { Technology } from "@/types/technology"

interface AppProviderProps {
    children: React.ReactNode;
    initialUser?: User;
    initialProjects?: Project[];
    initialLocales: Locale[];
    initialAbout?: AboutData;
    initialTechnologies?: Technology[];
}

const AppProvider = ({ children, initialUser, initialProjects, initialLocales, initialAbout, initialTechnologies }: AppProviderProps) => {
    return (
        <LocaleProvider initialLocales={initialLocales}>
            <ThemeProvider>
                <UserProvider initialUser={initialUser} initialProjects={initialProjects} initialAbout={initialAbout} initialTechnologies={initialTechnologies}>
                    {children}
                </UserProvider>
            </ThemeProvider>
        </LocaleProvider>
    )
}

export default AppProvider
