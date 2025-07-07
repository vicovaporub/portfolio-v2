import { LocalesService } from "../services/localesService";


export const getActiveLocales = async () => {
    const locales = await LocalesService.getActiveLocales()
    
    return locales;
}