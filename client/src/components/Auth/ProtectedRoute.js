import React from 'react'
import { Route, Redirect } from 'react-router-dom'; 
import { AuthConsumer } from '../../providers/AuthProvider'; 

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {auth => 
      <Route
      {...rest}
      render={ reactRouterProps =>(
        auth.authenticated ? 
        <Component {...reactRouterProps}/> 
        :
        <Redirect to ={{
          pathname:"/login",
          state: { from: reactRouterProps.location, }
        }}/>
      )}
      />
    }
  </AuthConsumer>
)

export default ProtectedRoute