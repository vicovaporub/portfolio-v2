import { supabase } from "../lib/supabaseClient";


export const ProjectService = {

    getProjects: async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
        
            if (error) throw error;
        
        return data;
    },

}