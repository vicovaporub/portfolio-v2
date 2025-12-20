import { supabase } from "../lib/supabaseClient";
import type { Technology } from "../../types/technology";
import { AppError } from "../lib/errors";


export const ProjectService = {

    getProjectsArray: async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch projects');
        }
        
        return data || [];
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

        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch projects with technologies');
        }

        if (!data) {
            return [];
        }

        const projects = data.map((project) => {
            const technologies = project.portfolio_project_technologies?.map(
                (t: { portfolio_technologies: Technology }) => t.portfolio_technologies
            ) || [];
            delete project.portfolio_project_technologies;
            return { ...project, technologies };
        })
        
        return projects;
    },
    
    getProjectById: async (id: string) => {
        if (!id) {
            throw AppError.validation('Project ID is required');
        }

        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            throw AppError.fromSupabaseError(error, `Failed to fetch project with id ${id}`);
        }

        if (!data) {
            throw AppError.notFound('Project', id);
        }

        return data;
    },
}