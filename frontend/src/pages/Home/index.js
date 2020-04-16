import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import Logo from '../../Components/Logo';

export default function Home() {
  const [name, setName] = useState('');
  const id = localStorage.getItem('userID');

  const history = useHistory();

  async function handleLoadName() {
    await api.get(`/users/${id}`)
    .then(res => {
      setName(res.data.name);
    })
  }

  function handleLogout() {
    localStorage.removeItem('userID');
    history.push('/login');
  }

  handleLoadName();

  return (
    <div className="home-container">
      <Logo />
      <h1>{`Welcome, ${name}`}</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
