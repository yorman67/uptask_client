import  { isAxiosError } from "axios";
import axiosClient from "../lib/axios";
import { ConfirmToken, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const { data } = await axiosClient.post('/auth/create-account', formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function confirmAccount (token: ConfirmToken) {
    try {
        const { data } = await axiosClient.post('/auth/confirm-account',  token )
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function resedToken(formData: RequestConfirmationCodeForm) {
    try {
        const { data } = await axiosClient.post('/auth/resend-token', formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const { data } = await axiosClient.post('/auth/login', formData)
        localStorage.setItem('token', data.token)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function forgotPassword(formData: RequestConfirmationCodeForm) {
    try {
        const { data } = await axiosClient.post('/auth/recover-password', formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function validateToken(token: ConfirmToken) {
    try {
        const { data } = await axiosClient.post('/auth/valide-token-recover-password',  token )
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}


export async function resetPasswordWithToken({formData,token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const { data } = await axiosClient.post(`/auth/update-password/${token}`, formData)
        return data
    }
    catch (error) {
        if(isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error) 
        }
    }
}

export async function getUser() {
    try {
        const { data } = await axiosClient.get('/auth/get-user')
        const response = userSchema.safeParse(data.user)
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