import { supabase } from "../lib/supabaseClient";
import { AppError } from "../lib/errors";


export const AboutService = {

    getAboutContent: async () => {
        const { data, error } = await supabase
            .from('portfolio_about')
            .select('*')
            .single()
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch about content');
        }
        
        if (!data) {
            throw AppError.notFound('About content');
        }
        
        return data;
    },

}