import { supabase } from "../lib/supabaseClient";


export const ProjectService = {

    getProjectsArray: async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
        
            if (error) throw error;
        
        return data;
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