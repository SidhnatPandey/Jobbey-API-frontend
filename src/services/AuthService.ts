import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
   const response =fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response
}

export async function apiSignUp(data: SignUpCredential) {
    const response = await fetch(`http://localhost:8000/api/v1/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response;
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: 'http://localhost:8000/api/v1/logout',
        method: 'get',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: 'http://localhost:8000/api/v1/password/forgot',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
