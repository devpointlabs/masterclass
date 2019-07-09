import React, { useState, useContext, useEffect, useCallback, } from "react";
import { useDropzone, } from 'react-dropzone';
import { AuthContext, } from "../providers/AuthProvider";
import { Container, Form, Grid, Image, Divider, Header, Button, } from "semantic-ui-react";

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

const Profile = () => {
  const { user, updateUser, } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, { name, email, file, });
    setEditing(false);
  };

  const editView = () => (
    <Form onSubmit={handleSubmit}>
      <Grid.Column width={4}>
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </Grid.Column>
      <Grid.Column width={8}>
        <Form.Input
          label="Name"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          value={email}
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Button>Submit</Form.Button>
      </Grid.Column>
    </Form>
  );

  const profileView = () => (
    <>
      <Grid.Column width={4}>
        <Image src={user.image || defaultImage} />
      </Grid.Column>
      <Grid.Column width={8}>
        <Header as="h1">{user.name}</Header>
        <Header as="h1">{user.email}</Header>
      </Grid.Column>
    </>
  );

  return (
    <Container>
      <Divider hidden />
      <Grid>
        <Grid.Row>
          {editing ? editView() : profileView()}
          <Grid.Column>
            <Button onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit"}</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
};

export default Profile;