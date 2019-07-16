import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import ParticlesContainer from "./ParticlesContainer";
import LoginForm from "./Login";
// import logo from '../../assets/logo.png';

const MainLogin = (props) => {
  return (
    <Container>
      <LoginContainer>
        <LoginForm {...props}/>
        <p>
          Don't have an account? <Link to="/register">Register here!</Link>
        </p>
      </LoginContainer>
      <LogoContainer>
        <h1>DevPoint University</h1>
        {/* <ParticlesContainer /> */}
        {/* <img src={logo} className="logo" alt="site-logo"/> */}
      </LogoContainer>
    </Container>
  );
};

export default MainLogin;

const LoginContainer = styled.div`
  width: 50%;
  /* background-color: #0f0c29; */
  background-color: #1F1C2C;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  h1 {
    font-weight: lighter;
  }
  p {
    color: #ffff;
    font-size: 14px;
    margin-top: 25px;
  }
`;

const LogoContainer = styled.div`
  width: 50%;
  background-color: red;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #2a0845, #8E2DE2, #4A00E0);
  position: relative;
  .logo {
    max-width: 450px;
  }
  h1 {
    color: white;
    letter-spacing: 2px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;