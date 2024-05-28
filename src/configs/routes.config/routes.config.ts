import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
// import path from 'path'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'about',
        path: '/about',
        component: lazy(() => import('@/views/About')),
        authority: [],
    },
    {
        key: 'contact',
        path: '/contact',
        component: lazy(() => import('@/views/Contact')),
        authority: [],
    },
    {
        key: 'jobPost',
        path: '/jobPost',
        component: lazy(()=> import('@/views/jobPost')),
        authority: ['user']
    }
]