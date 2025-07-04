import { Project } from "@/types/project";
import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<{ user?: User; projects?: Project[] }>({ user: undefined, projects: undefined });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>()
    const [projects, setProjects] = useState<Project[]>()

    useEffect(() => {
        const fetchData = async () => {
            const [userData, projectsData] = await Promise.all([
                fetch('/api/get-user').then(res => res.json()),
                fetch('/api/get-projects').then(res => res.json())
            ])
            setUser(userData.userData)
            setProjects(projectsData.projects)
        }
        fetchData()
    }, [])
    return (
        <UserContext.Provider value={{ user, projects }}>
            {children}
        </UserContext.Provider>
    )
}
