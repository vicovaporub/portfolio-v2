import { Project } from "@/types/project";
import { User } from "@/types/user";
import { Technology } from "@/types/technology";
import { createContext, useState } from "react";

export interface AboutData {
    id: number;
    text: string;
}

interface UserContextType {
    user?: User;
    projects?: Project[];
    about?: AboutData;
    technologies?: Technology[];
    isLoading: boolean;
    error: string | null;
}

export const UserContext = createContext<UserContextType>({ 
    user: undefined, 
    projects: undefined,
    about: undefined,
    technologies: undefined,
    isLoading: true,
    error: null
});

interface UserProviderProps {
    children: React.ReactNode;
    initialUser?: User;
    initialProjects?: Project[];
    initialAbout?: AboutData;
    initialTechnologies?: Technology[];
}

export const UserProvider = ({ children, initialUser, initialProjects, initialAbout, initialTechnologies }: UserProviderProps) => {
    const [user] = useState<User | undefined>(initialUser)
    const [projects] = useState<Project[] | undefined>(initialProjects)
    const [about] = useState<AboutData | undefined>(initialAbout)
    const [technologies] = useState<Technology[] | undefined>(initialTechnologies)
    const [isLoading] = useState(false)
    const [error] = useState<string | null>(null)
    
    return (
        <UserContext.Provider value={{ user, projects, about, technologies, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
