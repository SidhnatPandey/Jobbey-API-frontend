import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Input from '@/components/ui/Input';
import { newJob } from '@/services/JobService';
import Notification from '@/components/ui/Notification';
import toast from '@/components/ui/toast';

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required').max(1000, 'Job description cannot exceed 1000 characters.'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
  company: yup.string().required('Company is required'),
  industry: yup.array().of(yup.string().required()).required('Industry is required'),
  jobType: yup.string().required('Job type is required'),
  minEducation: yup.string().required('Minimum education is required'),
  positions: yup.number().required('Positions are required').min(1, 'At least 1 position is required'),
  experience: yup.string().required('Experience is required'),
  salary: yup.number().required('Salary is required'),
});

// Predefined industry options
const industryOptions = [
  'Business',
  'Information Technology',
  'Banking',
  'Education/Training',
  'Telecommunication',
  'Others'
];

const educationOptions = ["Bachelors", "Masters", "Phd"];
const jobTypeOptions = ["Temporary", "Permanent", "Internship"];

function JobForm() {
  return (
    <div>
      <h1>Job Form</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          email: '',
          address: '',
          company: '',
          industry: [],
          jobType: '',
          minEducation: '',
          positions: 1,
          experience: '',
          salary: '',
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formattedValues = {
              ...values,
              salary: Number(values.salary), 
            };
            const response = await newJob(formattedValues);
            if(response.status == 200){
              toast.push(
                <Notification type='success'>{`Job Posted Successfully!!`}</Notification>
              )
            }
            resetForm();
          } catch (error) {
            toast.push(
              <Notification type='danger'>{`Some Error occured while posting the job`}</Notification>
            )
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="title">Title</label>
                <Field as={Input} type="text" id="title" name="title" />
                <ErrorMessage name="title" component="div" />

                <label htmlFor="description">Description</label>
                <Field as={Input} type="text" id="description" name="description" />
                <ErrorMessage name="description" component="div" />

                <label htmlFor="email">Email</label>
                <Field as={Input} type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />

                <label htmlFor="address">Address</label>
                <Field as={Input} type="text" id="address" name="address" />
                <ErrorMessage name="address" component="div" />

                <label htmlFor="company">Company Name</label>
                <Field as={Input} type="text" id="company" name="company" />
                <ErrorMessage name="company" component="div" />

                <label htmlFor="industry">Industry</label>
                <Autocomplete
                  multiple
                  options={industryOptions}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => setFieldValue('industry', value)}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
                <ErrorMessage name="industry" component="div" />

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="jobType-label">Job Type</InputLabel>
                  <Select
                    labelId="jobType-label"
                    id="jobType"
                    name="jobType"
                    value={values.jobType}
                    onChange={(e) => setFieldValue('jobType', e.target.value)}
                    label="Job Type"
                  >
                    {jobTypeOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="jobType" component="div" />
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="minEducation-label">Minimum Education</InputLabel>
                  <Select
                    labelId="minEducation-label"
                    id="minEducation"
                    name="minEducation"
                    value={values.minEducation}
                    onChange={(e) => setFieldValue('minEducation', e.target.value)}
                    label="Minimum Education"
                  >
                    {educationOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="minEducation" component="div" />
                </FormControl>

                <label htmlFor="positions">Positions</label>
                <Field as={Input} type="number" id="positions" name="positions" />
                <ErrorMessage name="positions" component="div" />

                <label htmlFor="experience">Experience</label>
                <Field as={Input} type="text" id="experience" name="experience" />
                <ErrorMessage name="experience" component="div" />

                <label htmlFor="salary">Salary (per Year)</label>
                <Field as={Input} type="number" id="salary" name="salary" />
                <ErrorMessage name="salary" component="div" />
              </Grid>
            </Grid>
            <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default JobForm;
