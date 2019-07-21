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
				{/* <Header textAlign='left' as={HeaderText} fSize='large'>
					DevPoint <br />
					University
				</Header>
				<Header textAlign='left' as={HeaderText} fSize='small'>
					Learn It, Code It, Build It
				</Header>
				<Header textAlign='left' as={HeaderText} fSize='medium'>
					Let your SKILLS do the talking.
				</Header> */}
				<Image
				// size="massive"
				src={require('../Images/background-banner-side.png')}
				alternate="logo"
				style={{width: "100%", height: "100%"}}
				/>
			</AppContainer>
			<div style={{backgroundColor: "black"}}>
				<Courses />
			</div>
		</Fragment>
	);
};

const AppContainer = styled.div`
	/* background-color: #343A40; */
	background-color: black;
	/* display: "flex"; 
	justify-content: "center";  */
	/* padding-left: 5em;
	padding-top: 5em; */
`;

export default Home;

