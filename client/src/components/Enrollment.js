import React, { useEffect, useContext } from 'react';
import { Header, Card, Image, Container, Button, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const Enrollment = (props) => {
	const { user, enrollments, setEnrollments } = useContext(AuthContext);
	console.log(user);
	// axios call to get enrollments
	useEffect(() => {
		axios.get('/api/my-courses').then((res) => {
			setEnrollments(res.data);
		});
	}, []);

	const removeCourse = (id) => {
		axios.delete(`/api/my-courses/${id}`).then((res) => {
			setEnrollments(enrollments.filter((e) => e.course_id !== id));
		});
	};

	const renderEnrollments = () => {
		let roles = [];
		enrollments.map((e) => {
			if (e.role === 'student') {
				roles.push(e);
			}
			debugger;
		});
		return roles.map((e) => (
			<div key={e.course_id}>
				{/* <Header as = 'h1'>{e.role}</Header> */}
				{/* <br /> */}
				<Card>
					<div>
						<Link to={{ pathname: `/courses/${e.course_id}` }} style={{ color: 'black' }}>
							<Card.Header textAlign='center' as='h2'>
								{e.title}
							</Card.Header>

							<Card.Description style={{ padding: '15px' }}>
								{e.overview || 'This will have an overview'}
							</Card.Description>
						</Link>
					</div>
					<div style={{ minHeight: '300px', minWidth: '200px', backgroundImage: `url(${e.image})` }} />
					<Divider />
					<Card.Meta>
						{(e.role === 'student' || e.role === 'teacher') && (
							<Button size='tiny' color='red' icon animated onClick={() => removeCourse(e.course_id)}>
								<Button.Content visible>Unenroll</Button.Content>
								<Button.Content hidden>
									<Icon name='minus' />
								</Button.Content>
							</Button>
						)}
					</Card.Meta>
				</Card>
			</div>
		));
	};

	// will give a default role or user, if name is not able to be printed.
	const defaultRole = () => {
		if (enrollments.role === 'student') return 'student';
		else if (enrollments.role === 'teacher') return 'teacher';
		else return 'user';
	};

	return (
		<Container>
			<Header as='h1' textAlign='center'>
				{user ? (
					`Welcome ${user.name || defaultRole()}, here are your current enrollments`
				) : (
					<Link to='/'>Home</Link>
				)}
			</Header>
			<div style={{ display: 'flex', justifyContent: 'space-around' }}>{renderEnrollments()}</div>
		</Container>
	);
};

export default Enrollment;
