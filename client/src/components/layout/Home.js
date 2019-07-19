import React, { Fragment, useState } from 'react';
import Courses from '../Courses';
import { Header, Segment, Card, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import HeaderText from '../../Styles/HeaderText';
import CourseSlider from '../CourseSlider';
// import { useSpring, animated } from 'react-spring'

const Home = () => {
	const [ heading ] = useState('Courses');
	// const props = useSpring({opacity:1, from:{opacity: 0}, config:{delay: 1000, duration: 5000},})

	return (
		<Fragment>
			<AppContainer>
				{/* <animated.div style={props}> */}
				<Header textAlign='left' as={HeaderText} fSize='large'>
					DevPoint <br />
					University
				</Header>
				<Header textAlign='left' as={HeaderText} fSize='small'>
					Learn It, Code It, Build It
				</Header>
				<Header textAlign='left' as={HeaderText} fSize='medium'>
					Let your SKILLS do the talking.
				</Header>
				<br />
			</AppContainer>
			<div style={{ backgroundColor: 'red' }}>
				<Courses />
			</div>

			{/* <Container style={{ height: "200px", backgroundColor: "red" }}>
        <CourseSlider />
      </Container> */}
			{/* <Segment>
				<Header as='h1' textAlign='center'>
					{heading}
				</Header>
				<Card.Group itemsPerRow='2'>
					<Courses />
				</Card.Group>
			</Segment> */}
		</Fragment>
	);
};

const AppContainer = styled.div`
	background-color: rgb(53, 68, 62);
	padding-left: 5em;
	padding-top: 5em;
`;

export default Home;
