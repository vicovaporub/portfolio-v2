'use client'

import { LocaleProvider } from "./LocaleContext"

import { ThemeProvider } from "./ThemeContext"

import { UserProvider } from "./UserContext"

import { User } from "@/types/user"

import { Project } from "@/types/project"



interface AppProviderProps {

    children: React.ReactNode;

    initialUser?: User;

    initialProjects?: Project[];

}



const AppProvider = ({ children, initialUser, initialProjects }: AppProviderProps) => {

    return (

        <LocaleProvider>

            <ThemeProvider>

                <UserProvider initialUser={initialUser} initialProjects={initialProjects}>

                    {children}

                </UserProvider>

            </ThemeProvider>

        </LocaleProvider>

    )

}



export default AppProvider
