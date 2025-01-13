import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/slices/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../App.css';

function DesktopView(){
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('*Invalid email address')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, '*Password is too short - should be 8 chars minimum')
      .required('*Password is required'),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], '*Passwords must match')
      .required('*Confirm password is required'),
  });

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values) => {
    try {
      // Dispatch the signup action with the form values
      await dispatch(signup(values));
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <Card style={{height: "100vh"}} className='d-flex flex-column border-0 justify-content-around'> 
    <h1 className='text-left ms-5 fs-50'>KaQuiz</h1>
    <Card style={{height: "85%"}} className='d-flex p-3 flex-row border-0 justify-content-center mt-20 w-100'>
      <Card className='w-25 ml-3 mr-3 p-3'>
        <Card.Title style={{fontFamily: "'Poppins', sans-serif"}} className='text-left mb-2 fs-5 fw-normal'>Welcome!</Card.Title>
        <Card.Text className='text-left mt-2 mb-0 fw-bold fs-4'>Sign up to</Card.Text>
        <Card.Text className='text-left mb-3' style={{fontSize: "12px"}}>KaQuiz is simply </Card.Text>

    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      className='d-flex flex-column p-10'
    >
      {({ errors, touched, setFieldValue, isSubmitting, values, formProps }) => (
        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
          <p style={{fontSize: "12px"}} className='text-left mt-3 mb-0'>Email</p>
          <Field
            type="text"
            name="email"
            placeholder="Enter Your Email"
            className='form-control form-control-lg shadow-none border rounded-3'
            style={{fontSize: "12px", borderColor: '#ABABAB', fontColor: '#ABABAB'}}
          />
          {errors.email && touched.email && (
            <ErrorMessage  style={{fontSize: "12px"}} className='text-danger' name="email" component="div" />
          )}
          

          <p style={{fontSize: "12px"}} className='text-left mt-3 mb-0'>User name</p>
          <Field
            type="userName"
            name="userName"
            placeholder="Enter Your User Name"
            className='form-control form-control-lg shadow-none border rounded-3'
            style={{fontSize: "12px", borderColor: '#ABABAB', fontColor: '#ABABAB'}}
            
          />
          {errors.userName && touched.userName && (
            <ErrorMessage  style={{fontSize: "14px"}} className='text-danger' name="userName" component="div" />
          )}

          <div className="mb-3 position-relative">
          <p style={{fontSize: "12px"}} className='text-left mt-3 mb-0'>Password</p>
          <div className='d-flex flex-row border p-0 rounded-3 form-control  form-control-lg'>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Your Password"
              className='form-control  form-control-lg text-secondary border-0 shadow-none' 
              style={{fontSize: "12px", paddingRight: '35px', borderColor: '#ABABAB', fontColor: '#ABABAB'}}
            />
            
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-link mr-20"
              style={{color: '#000000'}}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          
            
          </div>
          
          
          {errors.password && touched.password && (
            <ErrorMessage className='text-danger'  style={{fontSize: "14px"}} name="password" component="div" />
          )}
          </div>

          <div className="mb-3 position-relative">
            <p style={{fontSize: "12px"}} className='text-left mt-0 mb-0'>Confirm Password</p>
            <div className='d-flex flex-row border p-0 rounded-3 form-control  form-control-lg'>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Enter Your Confirm Password"
                className='form-control  form-control-lg text-secondary border-0 shadow-none' 
                style={{fontSize: "12px", paddingRight: '35px', borderColor: '#ABABAB', fontColor: '#ABABAB'}}
              />
              
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="btn btn-link mr-20"
                style={{color: '#000000'}}
              >
                {showConfirmPassword? <FaEye /> : <FaEyeSlash />}
              </button>
             
            
            
          </div>
          
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorMessage className='text-danger' style={{fontSize: "14px"}} name="confirmPassword" component="div" />
          )}
          </div>
          
          <Button style={{fontSize: "12px"}} className='form-control bg-dark border-0 mt-1' type="submit">Register</Button>
        </Form>
      )}
    </Formik>
    
    <div className='d-flex justify-content-center mt-3'>
        <p style={{fontSize: "12px", color: "#7D7D7D"}}>Already have an account?</p>
        <Link href="/login" style={{fontSize: "12px", marginLeft: '10px', color: '#000000'}} className="text-decoration-none">Register</Link>
      </div>
    </Card>
    <Card className='border-0 ml-3 p-3' style={{maxWidth: '110vh'}} >
      <img className="h-100" src="/assets/small-team-discussing-ideas-2194220-0.png" alt='team' />
    </Card>
    </Card>
    </Card>
  );
}

function MobileView(){
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('*Invalid email address')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, '*Password is too short - should be 8 chars minimum')
      .required('*Password is required'),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], '*Passwords must match')
      .required('*Confirm password is required'),
  });

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values) => {
    try {
      // Dispatch the signup action with the form values
      await dispatch(signup(values));
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <Card style={{height: "100vh"}} className='d-flex flex-column border-0 justify-content-around'> 
    <h1 className='text-left ms-5 fs-50'>KaQuiz</h1>
    <Card style={{height: "100%"}} className='d-flex flex-row p-2 border-0 justify-content-center mt-20 w-100'>
      <Card className='w-100 min-w-30  mr-3 p-3'>
        <Card.Title style={{fontFamily: "'Poppins', sans-serif"}} className='text-left mb-2 fs-5 fw-normal'>Welcome!</Card.Title>
        <Card.Text className='text-left mt-2 mb-0 fw-bold fs-4'>Sign up to</Card.Text>
        <Card.Text className='text-left mb-2' style={{fontSize: "12px"}}>KaQuiz is simply </Card.Text>

    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      className='d-flex flex-column p-10'
    >
      {({ errors, touched, setFieldValue, isSubmitting, values, formProps }) => (
        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
          <p style={{fontSize: "12px"}} className='text-left mt-2 mb-0'>Email</p>
          <Field
            type="text"
            name="email"
            placeholder="Enter Your Email"
            className='form-control form-control-lg shadow-none border rounded-3'
            style={{fontSize: "12px", borderColor: '#ABABAB', fontColor: '#ABABAB'}}
          />
          {errors.email && touched.email && (
            <ErrorMessage  style={{fontSize: "12px"}} className='text-danger' name="email" component="div" />
          )}
          

          <p style={{fontSize: "12px"}} className='text-left mt-2 mb-0'>User name</p>
          <Field
            type="userName"
            name="userName"
            placeholder="Enter Your User Name"
            className='form-control form-control-lg shadow-none border rounded-3'
            style={{fontSize: "12px", borderColor: '#ABABAB', fontColor: '#ABABAB'}}
            
          />
          {errors.userName && touched.userName && (
            <ErrorMessage  style={{fontSize: "14px"}} className='text-danger' name="userName" component="div" />
          )}

          <div className="mb-3 position-relative">
          <p style={{fontSize: "12px"}} className='text-left mt-2 mb-0'>Password</p>
          <div className='d-flex flex-row border p-0 rounded-3 form-control  form-control-lg'>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Your Password"
              className='form-control  form-control-lg text-secondary border-0 shadow-none' 
              style={{fontSize: "12px", paddingRight: '35px', borderColor: '#ABABAB', fontColor: '#ABABAB'}}
            />
            
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-link mr-20"
              style={{color: '#000000'}}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          
            
          </div>
          
          
          {errors.password && touched.password && (
            <ErrorMessage className='text-danger'  style={{fontSize: "14px"}} name="password" component="div" />
          )}
          </div>

          <div className="mb-3 position-relative">
            <p style={{fontSize: "12px"}} className='text-left mt-0 mb-0'>Confirm Password</p>
            <div className='d-flex flex-row border p-0 rounded-3 form-control  form-control-lg'>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Enter Your Confirm Password"
                className='form-control  form-control-lg text-secondary border-0 shadow-none' 
                style={{fontSize: "12px", paddingRight: '35px', borderColor: '#ABABAB', fontColor: '#ABABAB'}}
              />
              
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="btn btn-link mr-20"
                style={{color: '#000000'}}
              >
                {showConfirmPassword? <FaEye /> : <FaEyeSlash />}
              </button>
             
            
            
          </div>
          
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorMessage className='text-danger' style={{fontSize: "14px"}} name="confirmPassword" component="div" />
          )}
          </div>
          
          <Button style={{fontSize: "12px"}} className='form-control bg-dark border-0 mt-1' type="submit">Register</Button>
        </Form>
      )}
    </Formik>
    
    <div className='d-flex justify-content-center mt-2'>
        <p style={{fontSize: "12px", color: "#7D7D7D"}}>Already have an account?</p>
        <Link href="/login" style={{fontSize: "12px", marginLeft: '10px', color: '#000000'}} className="text-decoration-none">Register</Link>
      </div>
    </Card>
    </Card>
    </Card>
  );
}

function Signup() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
    const isSmallScreenThreshold = 768;
  
    useEffect(() => {
      const checkScreenSize = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        setIsSmallScreen(width <= isSmallScreenThreshold);
      };
    
      // Check initial screen size
      checkScreenSize();
    
      // Listen for window resize events
      window.addEventListener('resize', checkScreenSize);
    
      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener('resize', checkScreenSize);
      };
    }, []);
  
    return isSmallScreen ? <MobileView /> : <DesktopView />;
  
}

export default Signup;
