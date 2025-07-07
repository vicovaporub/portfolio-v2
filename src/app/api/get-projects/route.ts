// import { getProjects } from '@/backend/controllers/projectsController';
import { Project } from '@/types/project';
import { NextResponse } from 'next/server';

export async function GET() {

    // const projects = await getProjects();

    const mockProjects: Project[] = [
        {
            id: 1,
            number: 1,
            title: 'Project 1',
            description: 'Description 1',
            company: 'Company 1',
            image_path: '/',
            link: 'https://www.google.com',
            repo_path: 'https://www.google.com',
            live_path: 'https://www.google.com'
        },
        {
            id: 2,
            number: 2,
            title: 'Project 2',
            description: 'Description 2',
            company: 'Company 2',
            image_path: '/',
            link: 'https://www.google.com',
            repo_path: 'https://www.google.com',
            live_path: 'https://www.google.com'
        },
        {
            id: 3,
            number: 3,
            title: 'Project 3',
            description: 'Description 3',
            company: 'Company 3',
            image_path: '/',
            link: 'https://www.google.com',
            repo_path: 'https://www.google.com',
            live_path: 'https://www.google.com'
        },
        {
            id: 4,
            number: 4,
            title: 'Project 4',
            description: 'Description 4',
            company: 'Company 4',
            image_path: '/',
            link: 'https://www.google.com',
            repo_path: 'https://www.google.com',
            live_path: 'https://www.google.com'
        }
    ]
    
    return NextResponse.json({ projects: mockProjects });
} 