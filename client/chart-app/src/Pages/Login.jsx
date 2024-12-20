import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/moving.png";
import logo1 from "../assets/road.png";
import axios from "axios";
import { API } from "../utility/APIutility";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const toastOptions = {
    autoClose: 800,
    pauseOnHover: true,
    position: "bottom-right",
  };
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  function validation() {
    const { email, password } = user;
    if (!password || password.length < 3) {
      toast.error("password should be Minimum 3 characters", toastOptions);
      return false;
    } else if (!email) {
      toast.error("Email is Required", toastOptions);
      return false;
    } else {
      return true;
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validation()) {
      const { email, password } = user;
      const res = await axios.post(API + "/auth/login", {
        email,
        password,
      });
      if (res.data.status === false) {
        toast.error(res.message, toastOptions);
      } else {
        toast.success(res.message, toastOptions);
        navigate("/");
      }
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handleLogin}>
        <div className="brand">
          <img src={logo} style={{ height: "100px", width: "100px" }} alt="" />
          <h4>Login</h4>
        </div>
        {/* <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Name"
        /> */}
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Password"
          name="password"
        />
        {/* <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Confirm Password"
        /> */}
        <button type="submit">Login</button>
        <span>
          Dont have account <Link to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h4 {
      text-transform: uppercase;
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem 3rem !important;
    background-color: #00000076;
    border-radius: 16px;
    input {
      outline: none;
      border: none;
      border-bottom: 3px solid green;
      padding: 0.5rem 1rem;
      width: 70%;
      back-ground: transparent;
      border-radius: 5px;
    }
    button {
      padding: 2px 4px;
    }
    span {
      color: white;
    }
  }
`;
export default Login;
