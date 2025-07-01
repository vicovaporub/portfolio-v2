import { ProjectService } from "../services/projectService"

export const getProjects = async () => {

    const projects = await ProjectService.getProjects();

    return projects;
    
}