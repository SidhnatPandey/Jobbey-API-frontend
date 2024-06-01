import { APPLY_NOW, GET_ALL_JOBS, NEW_JOB } from "@/constants/api.constant"
import FormData from 'form-data';

const token=localStorage.getItem('Token')
interface JobData {
    title: string;
    description: string;
    email: string;
    address: string;
    company: string;
    industry: string[];
    jobType: string;
    minEducation: string;
    positions: number;
    experience: string;
    salary: number;
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
    const url = APPLY_NOW.replace(":id", id);
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData as unknown as BodyInit
    });
   return response
};

export const newJob = async(data: JobData)=>{
    const response = await fetch(NEW_JOB, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data) 
    });    
    return response    
}