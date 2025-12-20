import { supabase } from "../lib/supabaseClient";


export const LocalesService = {

    getActiveLocales: async () => {
        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
            .eq('active', true)
        
        if (error) throw error;
        
        return data;
    },

    getLocaleByTag: async (tag: string) => {
        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
            .eq('tag', tag)
        
        if (error) throw error;
        
        return data;
    },

    getAllLocales: async () => {
        const { data, error } = await supabase
            .from('portfolio_locales')
            .select('*')
        
        if (error) throw error;
        
        return data;
    }
}