// components/ForgotPassword.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const ForgotPassword = ({ history }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Call your API endpoint here
      // Example: await api.sendPasswordResetEmail(values.email);
      console.log('Sending password reset email to:', values.email);
      alert('Password reset email sent successfully!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field
                type="email"
                name="email"
                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''} shadow-none`}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-dark border-0 shadow-none mt-3">
              {isSubmitting ? 'Sending...' : 'Send Password Reset Link'}
            </Button>
          </Form>
        )}
      </Formik>
      
    </div>
  );
};

export default ForgotPassword;
