import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/LoginAndSignUpPages/login';
import Signup from './components/LoginAndSignUpPages/signUp';
import ForgotPassword from './components/LoginAndSignUpPages/forgotPassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
