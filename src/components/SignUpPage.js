import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const StyledPage = styled.div`
  background-color:lightsteelblue;
  height: 500px;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const StyledSignUp = styled.div`
.login-form
  font-color: #fff;
  padding: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}

input {
  margin-left:10px;
  margin-bottom:10px;
}
    
button {
  padding:5px;
  border-radius:10px
  background-color:darkblue;
  color:white;
  font-size:1.5rem;
  padding-left:25px;
  padding-right:25px;
}
`;


const SignUpPage = props => {
  console.log(props);
    const [signup, setSignup] = useState({
        username: '',
        password: ''
    });

    const handleChanges = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
            }
        )
        // console.log('handlechange is firing')
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log('thesignup', signup)
        return axiosWithAuth()
        // any call that is going to need a response after a post* -- you have to do 'return' axiosWithAuth() -- *only post
        .post( '/auth/register', signup)
          // console.log('onsubmit is firing')
        .then(res => {
            console.log('props', props)
            localStorage.setItem('token', res.data.token);
            props.history.push('/login');
            return true
        })
            .catch(err => console.log(err.response));
    }

  return (
    <StyledPage>
    <StyledSignUp>
      <form className="sign-up-form" onSubmit={onSubmit}>
        <label htmlFor="first-name">Username (must be 8 or more characters): </label>
        <input type="text" name='username' placeholder="JohnDoe123..." username={signup.username} onChange={handleChanges} required/>
        <br />
        <label htmlFor="password">Password (must be 8 or more characters): </label>
        <input type="text" name='password' placeholder="12345678..." password={signup.password} onChange={handleChanges} required="Password must be 8 characters!"/>
        <br />

        <button type="submit">Sign Up</button>
        <p>
          Aleady have an account? <br />
          <Link to='/login'>Log in here</Link>{" "}
        </p>
      </form>
    </StyledSignUp>
    </StyledPage>
  );
};

export default SignUpPage;
