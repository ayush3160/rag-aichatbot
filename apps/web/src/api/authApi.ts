import { LoginUserBody, RegisterUserBody, RegisterUserResponse } from "@/types/authTypes";
import apiClient, { ApiError } from "./client";
import { AUTH_ENDPOINTS } from "./endpoints";

export const registerUser = async ( registerUser : RegisterUserBody) : Promise<RegisterUserResponse | ApiError> => {
    try {
        const response = await apiClient.post(AUTH_ENDPOINTS.AUTH_REGISTER, registerUser);
        return response.data;    
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
};

export const loginUser = async (loginUser : LoginUserBody) : Promise<RegisterUserResponse | ApiError> => {
    try {
        const response = await apiClient.post(AUTH_ENDPOINTS.AUTH_LOGIN, loginUser);
        return response.data;
    } catch (error : any) {
        return { status: error.response?.status || 500, error: error.message };
    }
}