import { APPLY_NOW, GET_ALL_JOBS } from "@/constants/api.constant"
import ApiService from "./ApiService"
import FormData from 'form-data';

export const getAllJobs = async () =>{
    return new Promise((resolve, reject) =>{
        fetch(GET_ALL_JOBS)
        .then((response) => response.json())
        .then((data)=> resolve(data))
        .catch((error)=> reject(error))
    })
}

export const applyJob = async (id: string, resume: File) => {
    const formData = new FormData();
    formData.append('file', resume);
  
    return ApiService.fetchData({
      url: APPLY_NOW.replace(':id', id),
      method: 'put',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  