import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext} from '../../providers/AuthProvider';

const FetchUser = ({children}) =>  {
    const [loaded, setLoaded] = useState(false); 
    const {authenticated, setUser} = useContext(AuthContext); 


    useEffect( () => {
        if(authenticated) {
            setLoaded(true); 
        } else {
            if(checkLocalToken()) {
                axios.get('/api/auth/validate_token')
                .then(res => {
                    setUser(res.data.data);
                    setLoaded(true); 
                })
                .catch(err => {
                    console.log(err);
                    setLoaded(true); 
                })
            } else {
                setLoaded(true); 
            }
        }
    }, []); 



    const checkLocalToken = () => {
        const token = localStorage.getItem('access-token');
        return token;
    }
 

        return(
            loaded ? children : null
        )
}


export default FetchUser;