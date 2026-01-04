import { Project } from "@/types/project";
import { User } from "@/types/user";
import { createContext, useState } from "react";

interface UserContextType {
    user?: User;
    projects?: Project[];
    isLoading: boolean;
    error: string | null;
}

export const UserContext = createContext<UserContextType>({ 
    user: undefined, 
    projects: undefined,
    isLoading: true,
    error: null
});

interface UserProviderProps {
    children: React.ReactNode;
    initialUser?: User;
    initialProjects?: Project[];
}

export const UserProvider = ({ children, initialUser, initialProjects }: UserProviderProps) => {
    const [user] = useState<User | undefined>(initialUser)
    const [projects] = useState<Project[] | undefined>(initialProjects)
    const [isLoading] = useState(false)
    const [error] = useState<string | null>(null)
    
    return (
        <UserContext.Provider value={{ user, projects, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
