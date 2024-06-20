import { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { Project,  TaskFormData } from "../types";

type createTaskProps = {
    formData: TaskFormData
    projectId: Project['_id']
}

export async function createTask({formData, projectId}: createTaskProps) {
    try {
        const { data } = await axiosClient.post(`projects/${projectId}/tasks`, formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
        
    }
}