import { GET_ALL_JOBS } from "@/constants/api.constant"

export const getAllJobs = async () =>{
    return new Promise((resolve, reject) =>{
        fetch(GET_ALL_JOBS)
        .then((response) => response.json())
        .then((data)=> resolve(data))
        .catch((error)=> reject(error))
    })
}