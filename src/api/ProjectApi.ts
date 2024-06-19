import { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await axiosClient.post('/newProjects', formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
        
    }
}