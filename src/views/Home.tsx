import React, { useEffect, useState } from "react";
import { GET_ALL_JOBS } from "@/constants/api.constant";
import JobCard from "./JobCard";
import "./card.css";
import { applyJob } from "@/services/JobService";
import ToastWrapper from "@/components/ui/toast/ToastWrapper";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

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

  
const Home = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [open, setOpen] = useState(false);
    const [resume, setResume] = useState<File | null>(null);
    const [jobId, setJobId] = useState<string>('');

    const getJobs = async () => {
      const response = await getAllJobs();
      if (response.success) {      
        setJobs(response.data);
      }
    };

    const handleOpen = (value: string) =>{
      setJobId(value);
      setOpen(true);
    }

    const handleApplyNow = (resume: File)=>{
      applyJob(jobId, resume).then((response)=>{
        if(response){
          ToastWrapper.success("Job Applied Successfully!")
        }
      }).catch((err)=>{
        console.error(err);    
      });  
    }
  
    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setResume(file);
      }
    };

    const handleApply = () => {
      if (resume) {
        handleApplyNow(resume);
        setOpen(false);
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
            <JobCard key = {job._id} job={job} handleApplyNow={handleOpen} />
        ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
        <Dialog open={open}>
          <DialogContent>
            <DialogTitle>Upload your Resume</DialogTitle>
            <input type="file" accept=".pdf,.docx" onChange={handleResumeChange} />
            <DialogActions>
              <Button onClick={handleApply}>Apply</Button>
              <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
      </>
    );
};
  
export default Home;