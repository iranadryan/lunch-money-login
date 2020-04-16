import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';
import './styles.css';

import Logo from '../../Components/Logo';
import Button from '../../Components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    if (email !== '' && password !== '') {
      await api.get('/users', {
        params: {
          email,
          password
        }
      })
        .then(res => {
          if (res.data.length === 1) {
            localStorage.setItem('userID', res.data[0].id)
            history.push('/');
          } else {
            alert('Error on login, try again');
          }
        })
        .catch(err => {
          alert('Error on login, try again');
        })
    } else {
      alert('Please, make sure you filled all fields')
    }
  }

  return (
    <div className="login-container">
      <Logo />
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <label>EMAIL ADDRESS</label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value) }}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <Link to="/reset">Forgot password?</Link>
        <Button type="submit">LOGIN</Button>
      </form>
      <p>Not registered? <Link to="/register">Create an account.</Link></p>
    </div>
  );
}
