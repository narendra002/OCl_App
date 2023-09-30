
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL
const token = localStorage.getItem('Token');


// Function to make a login request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    return response.data; // Assuming your server returns a token or user data
  } catch (error) {
    throw error;
  }
};

// Function to make a signup request
export const signup = async (email, username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, {
      email,
      username,
      password,

    });
    toast.success('User created successfully');
    return response.data; // Assuming your server returns a success message or user data
  } catch (error) {
    throw error;
  }
};

// Function to create a new task
export const createTask = async ({ taskName}) => {
  try {
 
    const response = await axios.post(`${BASE_URL}/api/tasks`, {
      taskName,
      
    },

    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all tasks
export const getAllTasks = async () => {
  try {
    
    const response = await axios.get(`${BASE_URL}/api/tasks`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to update a task by ID
export const updateTask = async ( taskId,{taskName}) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/tasks/${taskId}`, {
      taskName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a task by ID
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


