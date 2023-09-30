import { useState, useEffect } from 'react';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Todo from './Components/Todo';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <Router>
      <ToastContainer />

      <Routes>

        <Route path='/' element={
          <ProtectedRoutes>
            <Todo />
          </ProtectedRoutes>} />


        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </Router>
  );
}
export function ProtectedRoutes(props) {
  if (localStorage.getItem("Token")) {
    return props.children;
  }
  else {
    return <Navigate to="/login" />;
  }
}

export default App;
