import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
// import Dashboard from "./components/Dashboard/Dashboard";
import './signUp.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate authentication logic (hardcoded credentials)
    const validUsername = 'user123';
    const validPassword = 'pass123';

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      
      console.log('Login successful!');
    } else {
      console.log('Invalid credentials. Please try again.');
      Swal.fire(
        'Login failed!☹️',
        'Enter the valid credentials',
        'warning'
      )
    }
  };

  if (isLoggedIn) {
    // Redirect to the dashboard or home page if the user is logged in
    // You can use React Router for navigation or any other method you prefer
    // Example: history.push('/dashboard');
    // history.pushState('/dashboard')
    toast.success('You have logged-in successfully!👍', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
     // Navigate to 'tickets' page after a delay of 3 seconds (3000 milliseconds)
    setTimeout(() => {
      navigate('/dashboard')
      // window.location.href = '/dashboard';
    }, 2500);
    // return <div>Logged in! Redirecting...</div>;
  }

  return (
    <div className="login-page">
      <Link to="/" className="back-btn">
        <BsArrowLeft size={27} color="black" />
      </Link>
      <h1>Welcome Back!🙂</h1>
      <form onSubmit={handleSubmit}>
        <ToastContainer/>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
