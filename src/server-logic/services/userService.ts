import { supabase } from "../lib/supabaseClient";
import { AppError } from "../lib/errors";


export const UserService = {

    getUserData: async () => {
        const { data, error } = await supabase
            .from('portfolio_user')
            .select('*')
        
        if (error) {
            throw AppError.fromSupabaseError(error, 'Failed to fetch user data');
        }
        
        if (!data || data.length === 0) {
            throw AppError.notFound('User');
        }
        
        return data;
    }
}