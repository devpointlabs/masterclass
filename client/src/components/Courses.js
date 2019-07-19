import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
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

	const CourseSlider = () => {
		var settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			touchMove: true,
			autoPlay: true,
			className: 'slides'
		};
		return (
			<Slider {...settings}>
				{/* <div style={{ display: 'flex', flexwrap: 'nowrap' }}> */}
				{courses.map((course) => (
					<Slide
						key={course.id}
						id={course.id}
						title={course.title}
						overview={course.overview}
						image={course.image}
					/>
				))}
				{/* </div> */}
			</Slider>
		);
	};

	const Slide = ({ id, image, title, overview }) => (
		<Link to={{ pathname: `/courses/${id}` }}>
			<Card
				style={{
					backgroundColor: 'Blue',
					marginLeft: '100px',
					marginRight: '100px',
					marginTop: '50px'
				}}
				key={id}
			>
				<div textAlign='center'>
					{image}
					Image Goes Here
				</div>
				<h3>
					<Link to={{ pathname: `/courses/${id}` }}>{title}</Link>
				</h3>
				<div>
					Overview goes here
					{overview}
				</div>
			</Card>
		</Link>
	);

	return (
		<Fragment>
			<Header as='h1' textAlign='center'>
				Courses
			</Header>
			<Container style={{ height: '100px' }}>
				<CourseSlider />
			</Container>
		</Fragment>
	);
};

export default Courses;

const Container = styled.div`
	/* background: linear-gradient(350deg, rgba(2, 0, 36, 1) 0%, rgba(89, 9, 121, 0.67) 73%); */
`;
const Card = styled.div`
	margin: 15px;
	padding: 15px;
	background-color: white;
	border-radius: 5px;
	height: 250px;
	width: 450px;
`;

// style={{ backgroundColor: 'black' }}
