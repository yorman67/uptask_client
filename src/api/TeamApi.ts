import  { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { Project, TeamMember, TeamMemberForm, TeamMembersSchema } from "../types";


export async function findUserByEmail({ projectId, formData }: { projectId: Project['_id'], formData: TeamMemberForm }) {
    
    try {
        const { data } = await axiosClient.post(`project/${projectId}/team/find`,  formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            
        }
    }
}

export async function addTeamMember({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
    
    try {

        const { data } = await axiosClient.post(`project/${projectId}/team`, {id})
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            
        }
    }
}

export async function getTeamMembers({ projectId }: { projectId: Project['_id'] }) {
    try {   
        const { data } = await axiosClient.get(`project/${projectId}/team`)
        const response = TeamMembersSchema.safeParse(data.team)
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

export async function deleteTeamMember({ projectId, id }: { projectId: Project['_id'], id: TeamMember['_id'] }) {
    try {
        const { data } = await axiosClient.delete(`project/${projectId}/team/${id}`)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            
        }
    }
}