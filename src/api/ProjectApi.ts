import { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { ProjectFormData, dashboardProjectSchema } from "../types";

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

export async function getProjects() {
    try {
        const { data } = await axiosClient.get('/projects')
        const response = dashboardProjectSchema.safeParse(data.projects)
        console.log(response)
        if(response.success) {
            return response.data
        }
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}