import React, { useState } from "react";
import styled from "styled-components";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

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
const StyledLogin = styled.div`
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
const LoginPage = props => {
  console.log(props);
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChanges = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    }
    )
    // console.log('handlechange login is firing')
  };

  const onSubmit = e => {
    e.preventDefault();
    return axiosWithAuth()
    .post('/auth/login', login)
    // console.log('login is firing')
    .then(res => {
        // console.log(res)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.id);
        props.history.push('/myboard');
    })
        .catch(err => console.log('login error', err.response));
  }



  return (
    <StyledPage>
    <StyledLogin>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="username">Enter Username (must match your registered username): </label>
        <input type="text" name='username' placeholder="JohnDoe123..." username={login.username} onChange={handleChanges} required /><br />
        <label htmlFor="email">Password (must match your registered password): </label>
        <input type="text" name='password' placeholder="12345678..." password={login.password} onChange={handleChanges} required /><br />
        <button type="submit">Login</button>
        <p>
          Need to sign up? <br />
          <Link to='/'>Sign Up Now!</Link>
        </p>
      </form>
    </StyledLogin>
    </StyledPage>
  );
};



export default LoginPage;
