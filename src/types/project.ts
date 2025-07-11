
export interface Project {
    id: string | number;
    number: number;
    title: string;
    description: string;
    company: string;
    image_path: string;
    link: string;
    repo_path: string;
    live_path: string;
    slug: string;
    type?: string;
}