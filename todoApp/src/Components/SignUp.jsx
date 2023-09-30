import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { signup } from "./AxiosApiCaller"; // Import the signup function

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example (you can add more complex validation)
    const newErrors = {};

    if (!user.email) {
      newErrors.email = "Email is required";
    }

    if (!user.username) {
      newErrors.username = "Username is required";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the form or perform other actions
    if (Object.keys(newErrors).length === 0) {
      try {
        // Make the signup request without isAdmin status
        const response = await signup(user.email, user.username, user.password);
        console.log("Signup Response:", response);
        // Handle the response (e.g., show a success message or redirect to login page)
      } catch (error) {
        console.error("Signup error:", error);
        // Handle signup error (e.g., show an error message to the user)
      }
    }
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
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={user.username}
          onChange={handleInputChange}
          error={errors.username}
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
          Sign Up
        </Button>

        {/* Link to the login page */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
