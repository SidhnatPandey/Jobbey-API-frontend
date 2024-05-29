import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, TextField, Autocomplete } from '@mui/material';
import Input from '@/components/ui/Input'; 
import { newJob } from '@/services/JobService';

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().required('Description is required').max(1000, 'Job description cannot exceed 1000 characters.'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
  location: yup.object().shape({
    type: yup.string().required('Location type is required'),
    coordinates: yup.array()
      .of(yup.number().required('Coordinate is required'))
      .length(2, 'Must have exactly 2 coordinates')
      .required('Coordinates are required')
  }).required('Location is required'),
  company: yup.string().required('Company is required'),
  industry: yup.array().of(yup.string().required()).required('Industry is required'),
  jobType: yup.string().required('Job type is required'),
  minEducation: yup.string().required('Minimum education is required'),
  experience: yup.string().required('Experience is required'),
  salary: yup.number().required('Salary is required'),
  postingDate: yup.date().required('Posting date is required'),
  lastDate: yup.date().required('Last date is required'),
  positions: yup.number().required('Positions are required').min(1, 'At least 1 position is required'),
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

function JobForm() {
  return (
    <div>
      <h1>Job Form</h1>
      <Formik
        initialValues={{
          title: '',
          slug: '',
          description: '',
          email: '',
          address: '',
          location: {
            type: '',
            coordinates: [0, 0] as [number, number],
          },
          company: '',
          industry: [],
          jobType: '',
          minEducation: '',
          experience: '',
          salary: 0,
          postingDate: new Date().toISOString().split('T')[0],
          lastDate: new Date().toISOString().split('T')[0],
          positions: 1
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await newJob(values);
            console.log('Job created successfully:', response);
            resetForm();
          } catch (error) {
            console.error('Error creating job:', error);
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

                <label htmlFor="slug">Slug</label>
                <Field as={Input} type="text" id="slug" name="slug" />
                <ErrorMessage name="slug" component="div" />

                <label htmlFor="description">Description</label>
                <Field as={Input} type="text" id="description" name="description" />
                <ErrorMessage name="description" component="div" />

                <label htmlFor="email">Email</label>
                <Field as={Input} type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />

                <label htmlFor="address">Address</label>
                <Field as={Input} type="text" id="address" name="address" />
                <ErrorMessage name="address" component="div" />

                <label htmlFor="location.type">Location Type</label>
                <Field as={Input} type="text" id="location.type" name="location.type" />
                <ErrorMessage name="location.type" component="div" />

                <label htmlFor="location.coordinates[0]">Longitude</label>
                <Field
                  as={Input}
                  type="number"
                  id="location.coordinates[0]"
                  name="location.coordinates[0]"
                  value={values.location.coordinates[0]}
                  onChange={(e: { target: { value: string; }; }) => {
                    const newCoordinates: [number, number] = [parseFloat(e.target.value), values.location.coordinates[1]];
                    setFieldValue('location.coordinates', newCoordinates);
                  }}
                />
                <ErrorMessage name="location.coordinates[0]" component="div" />

                <label htmlFor="location.coordinates[1]">Latitude</label>
                <Field
                  as={Input}
                  type="number"
                  id="location.coordinates[1]"
                  name="location.coordinates[1]"
                  value={values.location.coordinates[1]}
                  onChange={(e: { target: { value: string; }; }) => {
                    const newCoordinates: [number, number] = [values.location.coordinates[0], parseFloat(e.target.value)];
                    setFieldValue('location.coordinates', newCoordinates);
                  }}
                />
                <ErrorMessage name="location.coordinates[1]" component="div" />

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

                <label htmlFor="jobType">Job Type</label>
                <Field as={Input} type="text" id="jobType" name="jobType" />
                <ErrorMessage name="jobType" component="div" />

                <label htmlFor="minEducation">Minimum Education</label>
                <Field as={Input} type="text" id="minEducation" name="minEducation" />
                <ErrorMessage name="minEducation" component="div" />

                <label htmlFor="experience">Experience</label>
                <Field as={Input} type="text" id="experience" name="experience" />
                <ErrorMessage name="experience" component="div" />

                <label htmlFor="salary">Salary (per Year)</label>
                <Field as={Input} type="number" id="salary" name="salary" />
                <ErrorMessage name="salary" component="div" />

                <label htmlFor="postingDate">Posting Date</label>
                <Field as={Input} type="date" id="postingDate" name="postingDate" />
                <ErrorMessage name="postingDate" component="div" />

                <label htmlFor="lastDate">Last Date</label>
                <Field as={Input} type="date" id="lastDate" name="lastDate" />
                <ErrorMessage name="lastDate" component="div" />

                <label htmlFor="positions">Positions</label>
                <Field as={Input} type="number" id="positions" name="positions" />
                <ErrorMessage name="positions" component="div" />
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
