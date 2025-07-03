import { supabase } from "../lib/supabaseClient";


export const UserService = {

    getUserData: async () => {
        const { data, error } = await supabase
            .from('portfolio_user')
            .select('*')
        
            if (error) throw error;
        
        return data;
    }
}