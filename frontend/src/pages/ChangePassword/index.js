import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import api from '../../services/api';
import './styles.css';

import Logo from '../../Components/Logo';
import Button from '../../Components/Button';

export default function ChangePassword() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const query = useQuery();
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function handleReset(event) {
    event.preventDefault();
    await api.get('/password-changes', {
      params: {
        email: query.get('email')
      }
    })
      .then(async res => {
        const { data } = res;

        if (data.length === 1) {
          let [change] = data;

          if (change.code === code) {
            await api.delete(`password-changes/${change.id}`);
            handleChange();
          }
        } else {
          alert('Something went wrong. Try again');
        }
      })
      .catch(err => {
        alert('Something went wrong. Try again');
      })
  }

  async function handleChange() {
    const user = await api.get('/users', {
      params: {
        email: query.get('email')
      }
    });
    let { id, email, name } = user.data[0];
    await api.put(`/users/${id}`, {
      email,
      name,
      password
    })
      .then(res => {
        history.push('/login');
      })
      .catch(err => {
        alert('something went wrong. try again')
      })
  }

  return (
    <div className="login-container">
      <Logo />
      <h1>Change your password</h1>
      <form onSubmit={handleReset}>
        <label>CHANGE CODE</label>
        <input
          type="text"
          value={code}
          onChange={e => { setCode(e.target.value) }}
        />
        <label>NEW PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <Button type="submit">CHANGE</Button>
      </form>
      <p><Link to="/login">Back to login</Link></p>
    </div>
  );
}
