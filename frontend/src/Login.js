import React, { useState } from 'react';

// Use 'image.png' from the public folder
const backgroundImage = 'url("/image.png")';

const styles = {
  outer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `${backgroundImage} center center/cover no-repeat`,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(10, 35, 66, 0.7)',
    zIndex: 1,
  },
  form: {
    background: '#102542',
    padding: '4rem',
    borderRadius: '28px',
    boxShadow: '0 12px 48px rgba(0,0,0,0.22)',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    width: '520px',
    alignItems: 'center',
    zIndex: 2,
  },
  input: {
    padding: '1.7rem',
    borderRadius: '12px',
    border: '3px solid #193b6a',
    background: '#1b3358',
    color: '#fff',
    fontSize: '2rem',
    width: '100%',
  },
  button: {
    padding: '1.7rem 3.5rem',
    borderRadius: '12px',
    border: 'none',
    background: '#1e5ab6',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginTop: '0.5rem',
    width: '100%',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontSize: '3.5rem',
    letterSpacing: '3px',
  },
};

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(username);
  };

  return (
    <div style={styles.outer}>
      <div style={styles.overlay}></div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.title}>Financia Login</div>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
} 