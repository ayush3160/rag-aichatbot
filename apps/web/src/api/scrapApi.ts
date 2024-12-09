import { Project } from '@/types/project';
import  apiClient , {ApiError}  from './client';
import { SCRAP_ENDPOINTS } from './endpoints';

export const scrapeWebsite = async (url : string,projectId : string) : Promise<String | ApiError> => {
    try {
        const response = await apiClient.post(SCRAP_ENDPOINTS.START_SCRAPPING, {url,projectId});
        return response.data;
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
}

export const getProject = async (projectId : string) : Promise<Project | ApiError> => {
    try {
        const response = await apiClient.get(`${SCRAP_ENDPOINTS.GET_PROJECT}/${projectId}`);
        return response.data;
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
}