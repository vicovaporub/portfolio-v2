import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

//create a context for the user data from the HomePage
export const UserContext = createContext<{ user?: User }>({ user: undefined });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetch('/api/get-user').then(res => res.json())
            setUser(userData.userData)
        }
        fetchUserData()
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
