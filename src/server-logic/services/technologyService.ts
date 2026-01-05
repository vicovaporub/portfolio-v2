import { supabase } from "../lib/supabaseClient";
import { AppError } from "../lib/errors";

export const TechnologyService = {
    getAllTechnologies: async () => {
        const { data, error } = await supabase
            .from('portfolio_technologies')
            .select('*')
            .order('name', { ascending: true });
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch technologies');
        }
        
        return data || [];
    }
};
