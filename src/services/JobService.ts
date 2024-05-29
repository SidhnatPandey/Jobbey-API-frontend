import { APPLY_NOW, GET_ALL_JOBS, NEW_JOB } from "@/constants/api.constant"
import ApiService from "./ApiService"
import FormData from 'form-data';

interface JobData {
    title: string;
    slug: string;
    description: string;
    email: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    company: string;
    industry: string[];
    jobType: string;
    minEducation: string;
    experience: string;
    salary: number;
    postingDate: string;
    lastDate: string;
    positions: number;
}


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

export const newJob = async(data: JobData)=>{
    return ApiService.fetchData({
        url: NEW_JOB,
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    
}
  