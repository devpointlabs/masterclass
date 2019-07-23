import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ParticlesContainer from "../../Styles/ParticlesContainer";
import LoginForm from "./Login";
import logo from '../Images/logo-picture.png';

const MainLogin = (props) => {
  return (
    <Container>
      <LoginContainer>
        <LoginForm {...props}/>
        <p>
          <span>Don't have an account?</span> <Link to="/register" style={{color: "#8E2DE2", fontWeight: "bolder"}}>Register Here!</Link>
        </p>
      </LoginContainer>
      <LogoContainer>
        <ParticlesContainer />
        <img src={logo} className="logo" alt="site-logo"/>
      </LogoContainer>
    </Container>
  );
};

export default MainLogin;

const LoginContainer = styled.div`
  width: 50%;
  /* background-color: #0f0c29; */
  /* background-color: #1F1C2C; */
  background-color: #1e1e1e;
  /* background-color: #1C2225; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
 
  p > span {
    color: #ffff;
    font-size: 14px;
    margin-top: 25px;
    font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; 
    text-decoration: underline; 
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
    margin: 0 auto; 
    max-width: 500px;
    max-height: 600px;
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