import React, { Fragment, useState } from 'react';
import Courses from '../Courses';
import { Header, Image, Segment, Card, Container, Icon} from 'semantic-ui-react';
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
			<Section className="bg-img">
				<Courses />
			</Section>
			<AppContainer style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-between"}}>
				<div style={{display: "flex", justifyContent: "space-around", width: "100vw", paddingTop: "80px"}}>
			<StyledCard>
					<p>'What an amazing journey and experience, I learned so much during my time at DevPoint Labs! I started with some basic knowledge and with the the assistance of the intense course curriculum and the incredible staff, instructor and TA’s, I was able to build an amazing foundation and understanding of programming. I am very excited for the new and life changing opportunities ahead! I would recommend DevPoint Labs to anyone who is considering attending a coding bootcamp.'</p>
					<div style={{display: "flex", paddingLeft: "30px"}}>
					<Icon size="large" name="user outline" circular color="white"/>
					<div style={{marginTop: "10px"}}>Heather Garbe</div>
					</div>
				</StyledCard>
			<StyledCard>
			<p style={{paddingBottom: "55px"}}>'As a recent graduate from DevPoint Labs, I have nothing but respect for their incredible program. Not only was the curriculum extensive and very well taught, the people I was able to meet through this program were always helpful and very kind. I would recommend DevPoint for anyone looking to improve their development skills, or get their foot in the door of the development industry.                  '</p>
					<div style={{display: "flex", paddingLeft: "30px"}}>
					<Icon size="large" name="user outline" circular color="white"/>
					<div style={{marginTop: "10px"}}>Nicholas Dyer</div>
					</div>
				</StyledCard>
			<StyledCard>
			<p style={{paddingBottom: "35px"}}>'This program was awesome! I'm so happy with my decision to leave my old career and join the dev world. I had no previous experience with coding before this bootcamp and I am impressed with how much I learned in just a short amount of time. Dave was an amazing instructor and the TA's were awesome too. Even after my class has ended Dave continues to help with questions and he genuinely cares about your success. '</p>
					<div style={{display: "flex", paddingLeft: "30px"}}>
					<Icon size="large" name="user outline" circular color="white"/>
					<div style={{marginTop: "10px"}}>Lindsay B</div>
					</div>
				</StyledCard>
				</div>
				<div>
				<footer style={{display: "flex", color: "#fff", justifyContent: "space-between",width: "100vw", padding: "5px", fontFamily: 'Nunito Sans', fontWeight: "bold"}}>
					<p>2019 DevPoint Studios LLC</p>
					<p>Made By DevPoint Alumni</p>
					</footer>
				</div>
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
	/* min-height: 70vh; */
	/* max-height: 40vh;  */
	
  /* //  padding-top: 20vh;
	// background-color: #808080;
	// background-color: #191919;
	// background: url("../Images/code-screen.png")  */
	/* background: rgba(25, 25, 25, 0.7);  */
	/* } */
`

const StyledCard = styled.div`
	background: #323232 !important; 
	width: 350px; 
	height: 300px; 
	color: #fff; 
	border: none !important; 
	border-radius: 10px; 
	font-family: "Nunito Sans", Arial, Helvetica, sans-serif; 

	p{
		text-align: center; 
		padding: 20px 5px; 
		font-weight: bold; 
	}
`
export default Home;

