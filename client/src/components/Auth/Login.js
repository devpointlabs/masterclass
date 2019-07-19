import React, {useState, useContext} from 'react';
import {  AuthContext } from "../../providers/AuthProvider"; 
import { Button, Form, Segment, Header, } from 'semantic-ui-react';
import styled from 'styled-components'; 



const Login = (props) =>{
  const emptyForm ={
    email: "",
    password: "", 
  }
  const [form, setForm] = useState(emptyForm);  
  const {handleLogin,} = useContext(AuthContext); 

  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({...form}, props.history,)
    props.history.goBack("/")
  }

  const handleChange = (name) => (e) => {
    setForm({...form, [name]: e.target.value})
  }


  return(
    <Segment basic>
      <Header as='h1' textAlign='center' style={{color: "white", fontFamily: "'Advent Pro', serif", letterSpacing: "2px", fontSize: "35px"}}>Login</Header>
      <StyledForm onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          className="field-input"
          name='email'
          autoFocus
          required         
          value={form.email}
          placeholder='Email'
          onChange={handleChange('email')}
        />
        <label>Password:</label>
        <input
          type="password"
          className="field-input"
          required
          name='password'
          value={form.password}
          placeholder='Password'
          type='password'
          onChange={handleChange('password')}
        />
      
        <input type="submit" value="submit" className="submit" />
        
      </StyledForm>
    </Segment>
  )

}




const StyledForm = styled(Form)`
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  width: 400px; 
  label {
    font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; 
    color: #fff; 
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 25px;
    border-bottom: 1px #fff solid; 
  }
   .submit {
    margin-top: 25px;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0,0,255,0.2);
    -webkit-appearance: button;
    border: none;
    outline: none;
    color: white;
    background: #8E2DE2;
    .value{
    font-size: 14px;
    font-weight: bold; 
    font-family: 'Nunito Sans', Arial, Helvetica, sans-serif; 
    }
  }
  .field-input {
    width: 100%;
    border: none;
    font-size: 18px;
    padding: 10px;
    outline: none;
  } 
`;
export default Login; 