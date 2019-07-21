import React from "react";
import { Header, Image } from "semantic-ui-react";
import { Link, } from "react-router-dom";
import styled from 'styled-components'

const NoMatch = () => (
  <>

  <Image
        // size="massive"
        centered
				src={require('../Images/404page.png')}
				alternate="logo"
				style={{paddingTop: "8rem",width: "30%", height: "30%"}}
				/>
  <Header as="h2" textAlign="center">
    Sorry! Please find your way back
    <Link to="/" style={{color: "purple"}}> Home</Link>.
  </Header>
  </>
);



export default NoMatch;
