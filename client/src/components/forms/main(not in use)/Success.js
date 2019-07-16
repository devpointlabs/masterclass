import React, {useEffect, useState,} from 'react';
import {Container, Segment, Header} from 'semantic-ui-react'


const Success = (props) => {
  const [redirect, setRedirect] = useState()
  
  useEffect(() => {
    const interval = setInterval(() => {
    props.history.push("/teachers/courses")
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  
  
  return (
    <Container>
      <Segment raised fluid>
        <Header as="h1">Thank you for your submission</Header>
      </Segment>
    </Container>
  )

}

export default Success
