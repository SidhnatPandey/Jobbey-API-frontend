import React from 'react'
import {  Card, Button } from '@/components/ui'
import "./card.css"

type Location = {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    city: string;
    state: string;
};

type Job = {
    title: string;
    company: string;
    description: string;
    salary: number;
    lastDate: string;
    jobType: string;
    minEducation: string;
    positions: number;
    postingDate: string;
    experience: string;
    industry: string[];
    address: string;
    email: string;
    _id: string;
    location: Location;
};

type JobCardProps = {
    job: Job;
    handleApplyNow?: (value: string) => void;
};

const JobCard: React.FC<JobCardProps> = ({ job, handleApplyNow, }) => {
  const { title, company, description, salary, lastDate, jobType, minEducation, positions, postingDate, experience, industry, address, email, _id } = job;
  
  return (
    <Card className="job-card">
      <h2>{title}</h2>
      <h3>Company Name: {company}</h3>
      <p>Job Description: {description}</p>
      <p>Salary: {new Intl.NumberFormat('en-IN',{style: 'currency', currency: 'INR'}).format(salary)}</p>
      <p>Job Type: {jobType}</p>
      <p>Posted Date: {new Date(postingDate).toLocaleDateString()}</p>
      <p>Due Date: {new Date(lastDate).toLocaleDateString()}</p>
      <p>Eligibility: {minEducation}</p>
      <p>Number of Openings: {positions}</p>
      <p>Experience: {experience}</p>
      <p>Sector: {industry}</p>
      <p>Address: {address}</p>
      <p>Email: {email}</p>
      <div style={{marginTop: "1rem"}}>
        <Button onClick={() => {
            if (handleApplyNow) handleApplyNow(_id);
          }} >Apply Now</Button>
      </div>
    </Card>
  )
}

export default JobCard