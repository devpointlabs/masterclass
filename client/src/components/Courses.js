import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button } from 'semantic-ui-react';
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

	const courseSlider = () => {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			touchMove: true,
			autoPlay: true,
			className: 'slides'
		};
		return <Slider {...settings} />;
	};

	const slide = ({ id, image, title, overview }) => (
		<Link to={{ pathname: `/courses/${id}` }}>
			<Card key={id}>
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
			<Container style={{ backgroundColor: 'black' }}>
				<br />

				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
					{courses.map((course) => (
						<slide
							key={course.id}
							id={course.id}
							title={course.title}
							overview={course.overview}
							image={course.image}
						/>
					))}
				</div>
			</Container>
		</Fragment>
	);
};

export default Courses;

const Container = styled.div`background: linear-gradient(350deg, rgba(2, 0, 36, 1) 0%, rgba(89, 9, 121, 0.67) 73%);`;
const Card = styled.div`
	margin: 15px;
	padding: 15px;
	background-color: white;
	border-radius: 5px;
	height: 250px;
	width: 450px;
`;
