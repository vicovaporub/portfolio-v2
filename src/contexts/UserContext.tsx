import { Project } from "@/types/project";
import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>()
    const [projects, setProjects] = useState<Project[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const [userResponse, projectsResponse] = await Promise.all([
                    fetch('/api/get-user'),
                    fetch('/api/get-project-array')
                ])

                // Verificar se há erros nas respostas
                if (!userResponse.ok) {
                    const userError = await userResponse.json()
                    throw new Error(userError.error?.message || 'Failed to fetch user data')
                }

                if (!projectsResponse.ok) {
                    const projectsError = await projectsResponse.json()
                    throw new Error(projectsError.error?.message || 'Failed to fetch projects')
                }

                const [userData, projectsData] = await Promise.all([
                    userResponse.json(),
                    projectsResponse.json()
                ])

                setUser(userData.userData)
                setProjects(projectsData.projects)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
                setError(errorMessage)
                console.error('Error fetching user data:', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])
    
    return (
        <UserContext.Provider value={{ user, projects, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
