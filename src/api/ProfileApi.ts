import { isAxiosError } from "axios"
import axiosClient from "../lib/axios"
import { UpdateCurrentPasswordForm, UserProfileForm } from "../types"

export async function updateProfile(formData:UserProfileForm) {
    try {
        const { data } = await axiosClient.put('/auth/update-profile', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function updatePassword(formData:UpdateCurrentPasswordForm) {
    try {
        const { data } = await axiosClient.post('/auth/update-profile-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}