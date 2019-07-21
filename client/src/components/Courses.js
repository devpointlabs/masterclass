import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components';
import Slider from 'react-slick';

const Courses = (props) => {
	// const [showForm, setShowForm] = useState(false);
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
				style={{ ...style, background: "purple" }}
				onClick={onClick}
			/>
		);
	}
		const settings = {
			dots: false,
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
			<Container style={{ height: '100px' }}>
			<Header as='h1' textAlign='center'>
				Courses
			</Header>
				{/* <CourseSlider /> */}
				<Slider {...settings}>
					{courses.map(c=>{
						return(
							<Card>
								<Link to={{pathname: `courses/${c.id}`}}>
									<h1>{c.title}</h1>
								</Link>
							</Card>
						)
					})}
				</Slider>
			</Container>
	);
};

export default Courses;

const Container = styled.div`
	/* background: linear-gradient(350deg, rgba(2, 0, 36, 1) 0%, rgba(89, 9, 121, 0.67) 73%); */
`;
const Card = styled.div`
background-color: rgb(90,90,90);
border: 2px solid black;
// margin-left: 100px;
// margin-right: 100px;
// margin-top: 50px;
	// padding: 15px;
	// text-align: center;
	// border-radius: 50%;
	height: 250px;
	width: 250px;
	text-decoration:none
	color: white;
`;

const Header = styled.h1`
text-shadow: 2px 2px 2px black;
color: white;
font-size: 35px;
text-align: center;
background-color: rgb(60,60,60)
`

