import React from "react";
import { Header, Image, Container } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import styled, {keyframes} from 'styled-components'

const NoMatch = () => (
  <>
  <NoMatchContainer>
  <Image
        // size="massive"
        bordered
        centered
				src={require('../Images/error-404.svg')}
				alternate="logo"
				style={{paddingTop: "8rem",width: "30%", height: "30%"}}
				/>
  <Header as="h2" textAlign="center" style={{color: "white"}}>
    Sorry! Please find your way back
    <Link to="/" style={{color: "purple"}}> Home</Link>.
  </Header>
  </NoMatchContainer>
  </>
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NoMatchContainer = styled.div`
height: 100%;
   min-height: calc(100vh - 90px);
   width: 100%;
   margin: 0 auto;
   padding: 25px 1em;
   animation: ${fadeIn} 1s linear;
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   background: #1e1e1e; 
`



export default NoMatch;
