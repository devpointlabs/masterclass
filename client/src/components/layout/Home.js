import React, { Fragment, useState } from 'react';
import Courses from '../Courses';
import { Header, Image, Segment, Card, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import HeaderText from '../../Styles/HeaderText';
// import { useSpring, animated } from 'react-spring'

const Home = () => {
	const [ heading ] = useState('Courses');
	// const props = useSpring({opacity:1, from:{opacity: 0}, config:{delay: 1000, duration: 5000},})

	return (
		<Fragment>
			<AppContainer>
				{/* <animated.div style={props}> */}
				<Image
				src={require('../Images/background-banner-side.png')}
				alternate="logo"
				style={{width: "100%", height: "70vh"}}
				/>
			</AppContainer>
	
			{/* <Section> */}
			{/* </Section> */}
			{/* <AppContainer> */}
			<Section className="bg-img">
				<Courses />
			</Section>
			{/* </AppContainer> */}
			<AppContainer>
				<h1>hi</h1>
			</AppContainer>
		</Fragment>
	);
};

const AppContainer = styled.div`
	/* background-color: #343A40; */
	background-color: #191919;
	min-height: 70vh;
	border-bottom: 4px solid #8d2de3;
`;
const Section = styled.div`
	min-height: 70vh;
	
  /* // padding-top: 20vh;
	// background-color: #808080;
	// background-color: #191919;
	// background: url("../Images/code-screen.png") */
	/* background: rgba(25, 25, 25, 0.7);  */

	.bg-img{
		background: cover;
		background-image: url("../Images/code-screen.png");
		background-position: center; 
		background-repeat: no-repeat; 
 		background-attachment: fixed;
	}

`
export default Home;

