import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const handleInput = (e) => {};
  const handleForm = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <form onSubmit={handleForm}>
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Name"
        />
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => handleInput(e)}
          placeholder="Confirm Password"
        />
        <button>Login</button>
        <span>
          Dont have account <Link to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
  );
};
const FormContainer = styled.div``;
export default Login;
