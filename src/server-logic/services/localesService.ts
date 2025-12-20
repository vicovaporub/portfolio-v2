import { supabase } from "../lib/supabaseClient";
import { AppError } from "../lib/errors";


export const LocalesService = {

    getActiveLocales: async () => {
        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
            .eq('active', true)
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch active locales');
        }
        
        return data || [];
    },

    getLocaleByTag: async (tag: string) => {
        if (!tag) {
            throw AppError.validation('Locale tag is required');
        }

        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
            .eq('tag', tag)
        
        if (error) {
            throw AppError.fromSupabaseError(error, `Failed to fetch locale with tag ${tag}`);
        }
        
        if (!data || data.length === 0) {
            throw AppError.notFound('Locale', tag);
        }
        
        return data;
    },

    getAllLocales: async () => {
        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch all locales');
        }
        
        return data || [];
    }
}