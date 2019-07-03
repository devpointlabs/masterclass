import React, { useState } from "react";
import axios from 'axios';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = (props) =>  {
  const [user, setUser] = useState(null); 
  const [enrollments, setEnrollments ] = useState([])

  // update user(id, user) - optional 
   

  // handle register
  const handleRegister = (user, history) =>{
    axios.post("/api/auth",user)
    .then(res=>{
      setUser(res.data.data)
      history.push('/')
    })
    .catch(err =>{
      console.log(err)
    })
  }

  //  handle login
  const handleLogin = (user, history) => {
    axios
       .post("/api/auth/sign_in", user)
       .then(res => {
          setUser(res.data.data)
          axios.get("/api/my-courses")
         .then(res => {
           setEnrollments(res.data)})
          history.push("/");
       })
       .catch(err => {
          console.log(err); 
       });
 };

 const handleLogout = (history) =>{
  axios.delete("/api/auth/sign_out")
  .then(res=>{
    setUser(null)
    history.push('/')
  })
  .catch(err =>{
    console.log(err)
  })
}

    return (
      <AuthContext.Provider
        value={{
          user, 
          authenticated: user !==null,
          handleLogin: handleLogin,
          handleRegister: handleRegister,
          handleLogout: handleLogout,
          enrollments: enrollments, 
          setUser: (user) => setUser(user),
          setEnrollments: (enrollment) => setEnrollments(enrollment),
          videos, 
          setVideos: (videos) => setVideos(videos), 
          updateVideos: updateVideos, 
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;
