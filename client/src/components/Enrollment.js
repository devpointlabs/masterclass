import React, { useEffect, useContext } from 'react';
import { Header, Card, Image, Container, Button, Icon, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components'; 

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
		axios.delete(`/api/my-courses/${id}`)
		.then((res) => {
			setEnrollments(enrollments.filter((e) => e.course_id !== id));
			props.history.push("/my-courses")
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
		return (
			roles.map((e) => (
			<Grid.Column>
			<Container key={e.course_id} >
			{/* <div key={e.course_id}> */}
				{/* <Card> */}
					{/* <div> */}
					<Link to={{ pathname: `/courses/${e.course_id}` }} >
					<Image src={e.image}/>
					<div style={{display: "flex", justifyContent: "flex-start", flexDirection: "column", background: "#5a5a5a"}}>
						<h1 style={{textSize: "2rem", color: "#fff", paddingTop: "10px", paddingLeft: "5px", fontFamily: "'Merriweather'"}}>{e.title}</h1>
						<p style={{padding: "10px", fontSize: "1.5rem", color:"#fff", fontFamily: "'Nunito Sans'"}}><div dangerouslySetInnerHTML={{__html: e.overview || "Overview coming soon..."}}></div></p>
						{(e.role === 'student' || e.role === 'teacher') && (
							<Button size='tiny' floated="left" style={{width: "15%", color: "red"}} textAlign="center" color='gray' icon animated onClick={() => removeCourse(e.course_id)}>
								<Button.Content visible>Unenroll</Button.Content>
								<Button.Content hidden>
									<Icon name='minus' />
								</Button.Content>
							</Button>
							
						)}
					</div>
						</Link>
			</Container>
			<br/>
			<br/>
			</Grid.Column>
		)));
	};

	// will give a default role or user, if name is not able to be printed.
	const defaultRole = () => {
		if (enrollments.role === 'student') return 'student';
		else if (enrollments.role === 'teacher') return 'teacher';
		else return 'user';
	};

	return (
		<EnrollmentContainer>
			<Header as='h1' textAlign='center' style={{color: "#fff", fontFamily: "'Merriweather', Helvetica", letterSpacing: "1px", paddingTop: "35px", paddingBottom: "20px", fontWeight: "lighter", borderBottom: "1px solid #fff"}}>
				{user ? (
					`Welcome ${user.name || defaultRole()}, here are your current enrollments!`
				) : (
					<Link to='/'>Home</Link>
				)}
			</Header>
			{/* <div style={{ display: 'flex', justifyContent: 'space-around' }}> */}
			<Container>
			<Grid columns={2}>
			<Grid.Row>
			{renderEnrollments()}
			</Grid.Row>
			</Grid>
			</Container>
			{/* </div> */}
		</EnrollmentContainer>
	);
};

const EnrollmentContainer = styled.div`
background: #323232; 
width: 100% important!; 
/* height: 100vh;  */
`

export default Enrollment;
