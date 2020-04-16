import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';
import './styles.css';

import Logo from '../../Components/Logo';
import Button from '../../Components/Button';

export default function Reset() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleReset(event) {
    event.preventDefault();

    if (email !== '') {
      await api.get('/users', {
        params: {
          email
        }
      })
        .then(async res => {
          let { data } = res;
          handleChangePassword(data);
        })
        .catch(err => {
          alert('Something went wrong, try again');
        })
    } else {
      alert('Please, make sure you filled the field')
    }
  }

  async function handleChangePassword(data) {
    let code = 'lunch' + Math.round(Math.random() * 100000);

    if (data.length === 1) {
      await api.post('/password-changes', {
        code,
        email
      })
        .then(res => {
          alert(`Your password change code is: ${code}`);
          history.push(`/change-password?email=${email}`);
        })
        .catch(err => {
          alert('Something went wrong. Try again');
        });

    } else {
      alert('Something went wrong, try again');
    }
  }

  return (
    <div className="login-container">
      <Logo />
      <h1>Forgot your password?</h1>
      <form onSubmit={handleReset}>
        <label>EMAIL ADDRESS</label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value) }}
        />
        <Button type="submit">RESET</Button>
      </form>
      <p><Link to="/login">Back to login</Link></p>
    </div>
  );
}
