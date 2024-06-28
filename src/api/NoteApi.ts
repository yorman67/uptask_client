import  { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteApiType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}
export async function createNote ({projectId, taskId, formData}: Pick<NoteApiType, 'projectId' | 'taskId' | 'formData'>) {

    try {
        const { data } = await axiosClient.post(`/project/${projectId}/tasks/${taskId}/notes`, formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }

}   

export async function deleteNote({projectId, taskId, noteId}: Pick<NoteApiType, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const { data } = await axiosClient.delete(`/project/${projectId}/tasks/${taskId}/notes/${noteId}`)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}