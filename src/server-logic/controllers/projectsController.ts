import { ProjectService } from "../services/projectService"

export const getProjectsArray = async () => {

    const projects = await ProjectService.getProjectsArray()

    return projects;
    
}

export const getProjectById = async (id: string) => {

    const project = await ProjectService.getProjectById(id)

    return project;
}

export const getProjectsArrayWithTechnologies = async () => {

    const projects = await ProjectService.getProjectsArrayWithTechnologies()

    projects.sort((a, b) => b.number - a.number);
    projects.forEach((project) => {
        project.type = "project";
    });

    return projects;
}