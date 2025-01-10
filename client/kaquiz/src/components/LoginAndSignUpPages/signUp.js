import React from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/slices/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum')
      .required('Password is required'),
  });

  const signupForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Dispatch the signup action with the form values
      await dispatch(signup(values));
      setSubmitting(false);
    } catch (error) {
      console.error('Signup failed:', error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={signupForm}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form onSubmit={!isSubmitting ? undefined : handleSubmit}>
          <Field
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <ErrorMessage name="firstName" component="div" />

          <Field
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <ErrorMessage name="lastName" component="div" />

          <Field
            type="email"
            name="email"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" />

          <Field
            type="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
