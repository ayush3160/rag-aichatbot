import apiClient , {ApiError} from "./client";
import { ProjectRequestBody , Project } from "@/types/project";
import { PROJECT_ENDPOINTS } from "./endpoints";

export const CreateProject = async (project : ProjectRequestBody) : Promise<Project | ApiError> => {
    try {
        const response = await apiClient.post(PROJECT_ENDPOINTS.PROJECT_CREATE, project);
        return response.data;
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
}

export const GetProjects = async () : Promise<Project[] | ApiError> => {
    try {
        const response = await apiClient.get(PROJECT_ENDPOINTS.PROJECT_ALL_PROJECTS);
        return response.data;
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
}