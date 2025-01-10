import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);


  const formSchema = Yup.object().shape({
    userName: Yup.string()
      .required('User name is required')
      .min(3, 'User name must be at least 3 characters'),
    password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum')
      .required('Password is required'),
  });

  const initialValues = {
    userName: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = async (values) => {
    try {
      // Dispatch the login action with the form values
      await dispatch(login(values));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Card style={{height: "100vh"}} className='d-flex flex-column border-0 justify-content-around'> 
    <h1 className='text-left ms-5 fs-50'>KaQuiz</h1>
    <Card style={{height: "80%"}} className='d-flex flex-row border-0 justify-content-center mt-20 w-100'>
      <Card className='w-25 mr-3 p-3'>
        <Card.Title style={{fontFamily: "'Poppins', sans-serif"}} className='text-left mb-2 fs-5 fw-normal'>Welcome !</Card.Title>
        <Card.Text className='text-left mt-2 mb-0 fw-bold fs-4'>Sign in to</Card.Text>
        <Card.Text className='text-left mb-3' style={{fontSize: "14px"}}>KaQuiz is simply </Card.Text>
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      className='d-flex flex-column p-10'
    >
      {({ errors, touched,  setFieldValue, isSubmitting, values, formProps }) => (
        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
          <p style={{fontSize: "14px"}} className='text-left mt-3 mb-0'>User name</p>
          <Field
            type="userName"
            name="userName"
            placeholder="Enter Your User Name"
            className='form-control form-control-lg'
            style={{fontSize: "14px"}}
            
          />
          {errors.userName && touched.userName && (
            <ErrorMessage name="userName" component="div" />
          )}

          <div className="mb-3 position-relative">
          <p style={{fontSize: "14px"}} className='text-left mt-3 mb-0'>Password</p>
          <div className='d-flex flex-row' style={{position: 'relative'}}>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Your Password"
              className='form-control  form-control-lg text-secondary'
              style={{fontSize: "14px", paddingRight: '35px'}}
            />
            
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-link p-0 mr-2 position-absolute top-50 translate-middle-y right-0"
              style={{color: '#000000'}}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
             
          </div>
          
          {errors.password && touched.password && (
            <ErrorMessage name="password" component="div" />
          )}
          </div>
          <div className='d-flex flex-row justify-content-between'>
          <div className="form-check mt-3 mb-3">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    checked={touched.rememberMe ? touched.rememberMe : false}
                    onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                    className="form-check-input bg-dark border-dark text-secondary"
                    style={{fontSize: "14px"}}
                  />
                  <label style={{fontSize: "14px"}} className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" style={{fontSize: "14px"}} className="text-right m-auto me-0 text-muted text-decoration-none">Forgot Password?</Link>
          </div>
          <Button style={{fontSize: "14px"}} className='form-control bg-dark border-0 mt-3' type="submit">Log In</Button>
        </Form>
      )}
    </Formik>
    <div className='d-flex justify-content-center mt-3'>
        <p style={{fontSize: "14px", color: "#7D7D7D"}}>Don't have an account?</p>
        <Link href="/register" style={{fontSize: "14px", marginLeft: '10px', color: '#000000'}} className="text-decoration-none">Register</Link>
      </div>
    </Card>
    <Card className='border-0 ml-3 p-3' style={{maxWidth: '110vh'}} >
      <img className="h-100" src="/assets/small-team-discussing-ideas-2194220-0.png" alt='team' />
    </Card>
    </Card>
    </Card>
  );
}

export default Login;
