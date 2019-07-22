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
				style={{width: "100%", height: "65vh"}}
				/>
			</AppContainer>
			<Section>
				<Courses />
			</Section>
			<AppContainer>
			</AppContainer>
		</Fragment>
	);
};

const AppContainer = styled.div`
	/* background-color: #343A40; */
	background-color: #191919;
	min-height: 65vh;
	border-bottom: 4px solid #8d2de3;
`;
const Section = styled.div`
	min-height: 75vh;
  padding-top: 20vh;
	// background-color: #808080;
	background-color: #191919;
	

`
export default Home;

