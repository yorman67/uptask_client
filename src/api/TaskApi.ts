import  { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status : Task['status']
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const { data } = await axiosClient.post(`project/${projectId}/tasks`, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const { data } = await axiosClient.get(`project/${projectId}/tasks/${taskId}`)
        const response = taskSchema.safeParse(data.tasks)
        if (response.success) {
            return response.data
        }
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({ formData, projectId, taskId }: Pick<TaskAPI, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const { data } = await axiosClient.put(`project/${projectId}/tasks/${taskId}`, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const { data } = await axiosClient.delete(`project/${projectId}/tasks/${taskId}`)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const { data } = await axiosClient.post(`project/${projectId}/tasks/${taskId}/status`, { status })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}