import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/moving.png";
import logo1 from "../assets/road.png";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    autoClose: 800,
    pauseOnHover: true,
    position: "bottom-right",
  };
  const handleInput = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };
  function validation() {
    const { name, email, password, confirmPassword } = user;
    if (!password || password.length < 3) {
      toast.error("password should be Minimum 3 characters", toastOptions);
      return false;
    } else if (!confirmPassword || confirmPassword.length < 3) {
      toast.error("confirm Pasword Minimum 3 characters", toastOptions);
      return false;
    } else if (user.password !== user.confirmPassword) {
      toast.error("Not match", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Name should be Minimum 3 characters", toastOptions);
      return false;
    } else if (!email) {
      toast.error("Email is Required", toastOptions);
      return false;
    } else {
      toast.success("Regisration success", toastOptions);
      return true;
    }
  }
  const handleForm = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log("API calling");
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleForm}>
        <div className="brand">
          <img src={logo} style={{ height: "100px", width: "100px" }} alt="" />
          <h4>React chart Application</h4>
        </div>
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Name"
          value={user.name}
          name="name"
        />
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Email"
          value={user.email}
          name="email"
        />
        <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Password"
          value={user.passwoed}
          name="password"
        />
        <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Confirm Password"
          value={user.confirmPassword}
          name="confirmPassword"
        />
        <button>Register</button>
        <span>
          Already have account? <Link to="/login">Login</Link>
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
export default Register;
