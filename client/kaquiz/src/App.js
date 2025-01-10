import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/LoginAndSignUpPages/login';
import Signup from './components/LoginAndSignUpPages/signUp';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Add routes here */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
