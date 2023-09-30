import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./AxiosApiCaller";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await login(user.email, user.password);
        console.log("User Data:", response);

        // Save user data in localStorage upon successful login
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('Token', response.token);
        // Redirect the user to the Home page 
     
        navigate('/');
       
      }
       catch (error) {
        console.error("Login error:", error);
        // Handle login error (e.g., show an error message to the user)
      }
    }
    useEffect(()=>{
      if(localStorage.getItem("Token")){
          navigate('/');
      }
  },[navigate]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="grid w-full max-w-md gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Button type="submit" fullWidth>
          Login
        </Button>
        <p className="text-center text-gray-500 mt-4">
          Create an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
