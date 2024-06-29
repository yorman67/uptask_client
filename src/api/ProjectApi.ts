import { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema, editProjectSchema, projectSchema } from "../types";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await axiosClient.post('/project', formData)
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
        const { data } = await axiosClient.get('/project')
        const response = dashboardProjectSchema.safeParse(data.projects)
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

export async function  getProjectById(id: Project['_id']) {
    try {
        const { data } = await axiosClient.get(`/project/${id}`)
        const response = editProjectSchema.safeParse(data.project)
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

export async function  getFullProject(id: Project['_id']) {
    try {
        const { data } = await axiosClient.get(`/project/${id}`)
        const response = projectSchema.safeParse(data.project)
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

type UpdateProjectProps = {
    formData: ProjectFormData
    idProject: Project['_id']
}
export async function updateProject({formData, idProject}: UpdateProjectProps) {
    try {
        const { data } = await axiosClient.put(`/project/${idProject}`, formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function deleteProject(id: Project['_id']) {
    try {
        const { data } = await axiosClient.delete(`/project/${id}`)
        return data.project
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}