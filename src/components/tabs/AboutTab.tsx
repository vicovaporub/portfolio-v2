'use client'
import { useEffect, useState } from "react";

export const AboutTab = () => {

    const [aboutContent, setAboutContent] = useState(null);

    useEffect(() => {
        const fetchAboutContent = async () => {
            const response = await fetch('/api/get-about');
            const data = await response.json();
            setAboutContent(data.aboutContent);
        }

        fetchAboutContent();
    }, []);

    return (
        <div>
            { aboutContent }
        </div>
    )

}