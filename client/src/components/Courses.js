import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components';
import Slider from 'react-slick';
import codeScreen from './Images/code-screen.png'

const Courses = (props) => {
	const [ courses, setCourses ] = useState([]);
	const { user, enrollments, setEnrollments } = useContext(AuthContext);

	useEffect((e) => {
		axios.get('/api/courses').then((res) => {
			setCourses(res.data);
		});
		axios.get('/api/my-courses').then((res) => {
			setEnrollments(res.data);
		});
	}, []);
	
	function NextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
			
				style={{ ...style, display:"block" }}
				onClick={onClick}
			/>
			
		);
	}
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			touchMove: true,
			autoPlay: true,
			className: 'slides',
			nextArrow: <NextArrow />,
			prevArrow: <NextArrow />,
			appendDots: dots =>(
				<div
				style={{
					// backgroundColor: "#ddd",
					// borderRadius: "10px",
					padding: "5px"
				}}
			>
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</div>
			),
			customPaging: i=>(

				<div>
					<Icon name="circle" color="white"/>
				</div>
			),
			responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
		}

	return (
				<div 
				className="butt-man"
				>
					<div style = {{paddingTop:"15vh"}}>

			<Header>
				Courses
			</Header>
				{/* <CourseSlider /> */}
				<div style={{padding: "25px"}}>

				<Slider {...settings}>
					{courses.map(c=>{
						return(
							<Link to={{pathname: `courses/${c.id}`}}>
							<Card>
								<div style={{paddingTop:"35px"}}>
									<h1>{c.title}</h1>
								</div>
							</Card>
								</Link>
						)
					})}
				</Slider>
					</div>
					</div>
					</div >
	);
};

export default Courses;

const Container = styled.div`
	/* background: linear-gradient(350deg, rgba(2, 0, 36, 1) 0%, rgba(89, 9, 121, 0.67) 73%); */
	padding: 50px;
`;
const Card = styled.div`
background: linear-gradient(350deg, rgb(51, 0, 190) 0%, rgba(108, 0, 197, 0.67) 73%);
opacity: .87;
border: 1px solid #8d2de3;
/* margin-left: 100px;
margin-right: 100px;
margin-top: 50px;
padding: 15px;
text-align: center;
border-radius: 50%; */
height: 250px;
text-decoration:none;
color: white;
text-align:center;
font-family: Halant

`;

const Header = styled.h1`
color: white;
font-size: 50px;
text-align: center;
margin-bottom: 30px;
`

const BackgroundImage = styled.div`
	width:100%;
 height:70vh;
//  background: cover;
 background: url(./Images/code-screen.png);

`

