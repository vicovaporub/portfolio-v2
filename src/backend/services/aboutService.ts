import { supabase } from "../lib/supabaseClient";


export const AboutService = {

    getAboutContent: async () => {
        const { data, error } = await supabase
            .from('portfolio_about')
            .select('*')
            .single()
        
            if (error) throw error;
        
        return data;
    },

}