export type SignInCredential = {
    email: string
    password: string

}

export type SignInResponse = {
    sucess:boolean,
    token: string
    
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    name: string
    email: string
    password: string
    role: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
