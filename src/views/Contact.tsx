import emailjs from 'emailjs-com';
import React from 'react';
import Input from '@/components/ui/Input';
import { Box, Grid } from '@mui/material';

function Contact() {
  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', target, 'YOUR_USER_ID')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <>
      <h1 style={{marginBottom: '1rem', display: "flex", alignContent: 'center', justifyContent: 'center'}}>Contact</h1>
      <p style={{marginBottom: '1rem', display: "flex", alignContent: 'center', justifyContent: 'center'}}>Have a question or want to talk business? Get in touch!</p>
      <Box style={{marginBottom: '1rem', display: "flex", alignContent: 'center', justifyContent: 'center'}}>
        <form onSubmit={sendEmail}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label htmlFor="name">Name</label>
              <Input type="text" id="name" name="name" placeholder='Enter Your Name' />
            </Grid>
            <Grid item xs={6}>
              <label htmlFor="email">Email</label>
              <Input type="text" id="email" name="email" placeholder='Enter Your Email' />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="message">Message</label>
              <Input
                id="outlined-multiline-static"
                rows={4}
                placeholder='Type your Message in this box'
              />
            </Grid>
          </Grid>

          <button type="submit">Send</button>
        </form>
      </Box>
    </>
  )
}

export default Contact;