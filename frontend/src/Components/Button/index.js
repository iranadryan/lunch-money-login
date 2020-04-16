import React from 'react';

import './styles.css';

export default function Button({ children, type }) {
  return (
    <button type={type}>{children}</button>
  );
}
