import { AboutService } from "../services/aboutService";

export const getAboutContent = async () => {

    const aboutContent = await AboutService.getAboutContent();

    return aboutContent;
}