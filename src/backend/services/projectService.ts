import { supabase } from "../lib/supabaseClient";
import type { Technology } from "../../types/technology";


export const ProjectService = {

    getProjectsArray: async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
        
        if (error) throw error;
        
        return data;
    },

    getProjectsArrayWithTechnologies: async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select(`
                *,
                portfolio_project_technologies (
                    portfolio_technologies ( id, name, icon_path )
                )
            `);

        if (error) throw error;

        const projects = data.map((project) => {
            const technologies = project.portfolio_project_technologies.map(
                (t: { portfolio_technologies: Technology }) => t.portfolio_technologies
            );
            delete project.portfolio_project_technologies;
            return { ...project, technologies };
        })
        
        return projects;
    },
    
    getProjectById: async (id: string) => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error;

        return data;
    },
}