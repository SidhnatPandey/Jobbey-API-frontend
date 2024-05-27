import React, { useEffect, useState } from "react";
import { GET_ALL_JOBS } from "@/constants/api.constant";
import JobCard from "./JobCard";
import "./card.css";
import { applyJob } from "@/services/JobService";
import ToastWrapper from "@/components/ui/toast/ToastWrapper";

type Location = {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    city: string;
    state: string;
};
  
type Job = {
    address: string;
    company: string;
    description: string;
    email: string;
    experience: string;
    industry: string[];
    jobType: string;
    lastDate: string;
    location: Location;
    minEducation: string;
    positions: number;
    postingDate: string;
    salary: number;
    slug: string;
    title: string;
    _id: string;
};
  
type Response = {
    success: boolean;
    results: number;
    data: Job[];
};

const getAllJobs = async (): Promise<Response> => {
    return new Promise((resolve, reject) => {
      fetch(GET_ALL_JOBS)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
};

const handleApplyNow = (value: string)=>{
  console.log(value);
  applyJob(value).then((response)=>{
    if(response){
      ToastWrapper.success("Job Applied Successfully!")
    }
  }).catch((err)=>{
    console.error(err);    
  });  
}
  
const Home = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const getJobs = async () => {
      const response = await getAllJobs();
      if (response.success) {      
        setJobs(response.data);
      }
    };
  
    useEffect(() => {
      getJobs();
    }, []);
  
    return (
      <>
        <h1 style={{marginBottom: '1rem', display: "flex", alignContent: 'center', justifyContent: 'center'}}>Job Lists</h1>
        <div className="job-card-container">
        {jobs.map((job) => (
            <JobCard key = {job._id} job={job} handleApplyNow={handleApplyNow} />
        ))}
        </div>
      </>
    );
};
  
export default Home;