import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';
import './styles.css';

import Logo from '../../Components/Logo';
import Button from '../../Components/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const history = useHistory();

  async function handleRegsiter(event) {
    event.preventDefault();
    if (email !== '' && password !== '' && name !== '') {
      let user = { email, name, password }
      await api.post('/users', user)
        .then(res => {
          history.push('/login');
        })
        .catch(err => {
          alert('Error on registering. Try again');
        });
    } else {
      alert('Please, make sure you filled all fields')
    }
  }

  return (
    <div className="login-container">
      <Logo />
      <h1>Welcome aboard!</h1>
      <form onSubmit={handleRegsiter}>
        <label>EMAIL ADDRESS</label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value) }}
        />
        <label>NAME</label>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value) }}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
      <p>Already signed up? <Link to="/login">Login to your account.</Link></p>
    </div>
  );
}
