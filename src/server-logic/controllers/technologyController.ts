import { TechnologyService } from "../services/technologyService";

export const getAllTechnologies = async () => {
    const technologies = await TechnologyService.getAllTechnologies();
    return technologies;
};
