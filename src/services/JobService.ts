import { APPLY_NOW, GET_ALL_JOBS } from "@/constants/api.constant"
import ApiService from "./ApiService"

export const getAllJobs = async () =>{
    return new Promise((resolve, reject) =>{
        fetch(GET_ALL_JOBS)
        .then((response) => response.json())
        .then((data)=> resolve(data))
        .catch((error)=> reject(error))
    })
}

export const applyJob = async (id: string)=>{
    return ApiService.fetchData({
        url: `${APPLY_NOW}?id=${id}`,
        method: 'put',
    })
}