import React, { useState, useContext, useEffect, useCallback, } from "react"
import {useDropzone} from 'react-dropzone'
import { AuthContext, } from "../providers/AuthProvider"
import { Container, Form, Grid, Image, Divider, Header, Button, } from "semantic-ui-react"
import styled, {keyframes} from 'styled-components'; 

// const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';
const defaultImage = 'https://png.pngtree.com/svg/20161212/f93e57629c.svg';

const Profile = () => {
  const { user, updateUser} = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("")
  
  
  useEffect(()=>{
    setName(user.name)
    setEmail(user.email)
  },[])
  
  const onDrop = useCallback (acceptedFiles =>{
    //does something with the file
    setFile(acceptedFiles[0])
  },[])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  const handleSubmit =(e) =>{
    e.preventDefault()
    updateUser(user.id, { name, email, file})
    setEditing(false)
  }
  const editView = () => (
    <>
    <StyledForm onSubmit = {handleSubmit}>
      <Grid.Column width={4}>
      <div style={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      {/* {
        isDragActive ?
          <p>Image added Successfully! </p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
      {file
           ? "Image successfully added"
        : "Please select an image for profile picture"}
    </div>
      </Grid.Column>
      <Grid.Column width={8}>
        <Form.Input 
        label="Name"
        placeholder = "Name"
        required
        value={name}
        onChange={(e)=> setName(e.target.value)}
        />
        <Form.Input 
        label="Email"
        placeholder = "Email"
        required
        value={email}
        type="email"
        onChange={(e)=> setEmail(e.target.value)}
        />
      </Grid.Column>
      <Divider />
      <Form.Button>Submit</Form.Button>
    </StyledForm>
    </>
  )
  
  const profileView = () => (
    <>
    <StyledForm>
      {/* <Grid.Column width={4}> */}
        {/* <Image src={user.image || defaultImage} /> */}
        <ProfileImage size="medium" src={user.image || defaultImage} alt="profile image" />
      {/* </Grid.Column>
      <Grid.Column width={8}>
        <Header as="h1">{user.name}</Header>
        <Header as="h1">{user.email}</Header>
      </Grid.Column> */}
      </StyledForm>
    </>
  );

  return (
    <ProfileContainer>
            <EditButton onClick={() => setEditing(!editing)}>{ editing ? "Cancel Edit" : "Edit Profile" }</EditButton>
       { editing ? editView() : profileView() }
    </ProfileContainer>
  );
};
const styles = {
  dropzone: {
  
  height: "200px",
  backgroundColor: "#c1c1c1", 
  width: "100%", 
  padding: "10px", 
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px"
}
// label {
//   font-size: 16px;
//   align-self: flex-start;
//   margin: 10px 0;
//   color: #666;
// }
}


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProfileContainer = styled.div`
height: 100%;
   min-height: calc(100vh - 90px);
   width: 100%;
   margin: 0 auto;
   padding: 25px 1em;
   animation: ${fadeIn} 1s linear;
   position: relative;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background: #5a5a5a; 
`

const EditButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   margin: 25px 1em;
   padding: 15px 30px;
   font-size: 16px;
   background-color: #8e2de2;
   -webkit-appearance: button;
   border-radius: 5px;
   border: none;
   outline: none;
   color: white;
   cursor: pointer;
`;

const ProfileImage = styled(Image)`
  max-width: 100%;
   margin-bottom: 15px;
   border-radius: 5px;
`


const StyledForm = styled(Form)`
  display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: #323232;
   border-radius: 5px;
   width: 500px;
   padding: 1.25em;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
`
export default Profile;