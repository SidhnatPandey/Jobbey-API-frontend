import React from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid } from '@mui/material';
import Input from '@/components/ui/Input';

const schema = yup.object().shape({
  address: yup.string().required(),
  company: yup.string().required(),
  description: yup.string().required(),
  email: yup.string().email().required(),
  experience: yup.string().required(),
  industry: yup.array().of(yup.string()).required(),
  jobType: yup.string().required(),
  lastDate: yup.date().required(),
  location: yup.object().shape({
    type: yup.string().required(),
    coordinates: yup.array().of(yup.number()).required(),
  }).required(),
  minEducation: yup.string().required(),
  positions: yup.number().required(),
  postingDate: yup.date().required(),
  salary: yup.number().required(),
  slug: yup.string().required(),
  title: yup.string().required(),
});

// interface FormValues {
//   address: string;
//   company: string;
//   description: string;
//   email: string;
//   experience: string;
//   industry: string[];
//   jobType: string;
//   lastDate: Date;
//   location: {
//     type: string;
//     coordinates: number[];
//   };
//   minEducation: string;
//   positions: number;
//   postingDate: Date;
//   salary: number;
//   slug: string;
//   title: string;
// }

function JobForm() {
  return (
    <div>
      <h1>Job Form</h1>
      <Formik
        initialValues={{
          address: '',
          company: '',
          description: '',
          email: '',
          experience: '',
          industry: [],
          jobType: '',
          lastDate: new Date(),
          location: {
            type: '',
            coordinates: [0, 0]
          },
          minEducation: '',
          positions: 0,
          postingDate: new Date(),
          salary: 0,
          slug: '',
          title: ''
        }}
        validationSchema={schema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label htmlFor="title">Title</label>
                <Input type="text" id="title" name="title" />
                <ErrorMessage name="title" component="div" />

                <label htmlFor="email">Email</label>
                <Input type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />

                <label htmlFor="company">Company Name</label>
                <Input type="text" id="company" name="company" />
                <ErrorMessage name="company" component="div" />

                <label htmlFor="experience">Experience</label>
                <Input type="text" id="experience" name="experience" />
                <ErrorMessage name="experience" component="div" /> 

                <label htmlFor="postingDate">Posting Date</label>
                <Input type="date" id="postingDate" name="postingDate" />
                <ErrorMessage name="postingDate" component="div" />

                <label htmlFor="coordinates[0]">Longitude</label>
                <Input
                  type="number"
                  id="coordinates[0]"
                  name="location.coordinates[0]"
                  value={values.location.coordinates[0]}
                  onChange={(e) => {
                    const newCoordinates = [...values.location.coordinates];
                    newCoordinates[0] = parseFloat(e.target.value);
                    setFieldValue('location.coordinates', newCoordinates);
                  }}
                />
                <ErrorMessage name="location.coordinates[0]" component="div" />

                <label htmlFor="salary">Salary (per Year)</label>
                <Input prefix="₹" type="number" id="salary" name="salary" />
                <ErrorMessage name="salary" component="div" />

                <label htmlFor="slug">Slug</label>
                <Input type="text" id="slug" name="slug" />
                <ErrorMessage name="slug" component="div" />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="description">Description</label>
                <Input type="text" id="description" name="description" />
                <ErrorMessage name="description" component="div" />

                <label htmlFor="jobType">Job Type</label>
                <Input type="text" id="jobType" name="jobType" />
                <ErrorMessage name="jobType" component="div" />

                <label htmlFor="minEducation">Minimum Education</label>
                <Input type="text" id="minEducation" name="minEducation" />
                <ErrorMessage name="minEducation" component="div" />

                <label htmlFor="address">Address</label>
                <Input type="text" id="address" name="address" />
                <ErrorMessage name="address" component="div" />

                <label htmlFor="location.type">Location Type</label>
                <Input type="text" id="location.type" name="location.type" />
                <ErrorMessage name="location.type" component="div" />

                <label htmlFor="coordinates[1]">Laptitude</label>
                <Input
                  type="number"
                  id="coordinates[1]"
                  name="location.coordinates[1]"
                  value={values.location.coordinates[1]}
                  onChange={(e) => {
                    const newCoordinates = [...values.location.coordinates];
                    newCoordinates[1] = parseFloat(e.target.value);
                    setFieldValue('location.coordinates', newCoordinates);
                  }}
                />
                <ErrorMessage name="location.coordinates[1]" component="div" />

                <label htmlFor="lastDate">Last Date</label>
                <Input type="date" id="lastDate" name="lastDate" />
                <ErrorMessage name="lastDate" component="div" />

                <label htmlFor="positions">Positions</label>
                <Input type="number" id="positions" name="positions" />
                <ErrorMessage name="positions" component="div" />
              </Grid>
            </Grid>
            <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit">Submit</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default JobForm;
