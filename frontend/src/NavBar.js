import React from 'react';

const styles = {
  nav: {
    background: '#102542',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 4rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    fontSize: '2rem',
    minHeight: '90px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2.3rem',
    letterSpacing: '2px',
  },
  links: {
    display: 'flex',
    gap: '2.5rem',
  },
  link: {
    color: '#fff',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '1rem 2.2rem',
    borderRadius: '10px',
    transition: 'background 0.2s',
    outline: 'none',
  },
};

export default function NavBar({ onNavigate, onLogout }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.title}>Financia</span>
      <div style={styles.links}>
        <button style={styles.link} onClick={() => onNavigate('expenses')}>Expenses</button>
        <button style={styles.link} onClick={() => onNavigate('categories')}>Categories</button>
        <button style={styles.link} onClick={() => onNavigate('merchants')}>Merchants</button>
        <button style={styles.link} onClick={() => onNavigate('subscriptions')}>Subscriptions</button>
        <button style={styles.link} onClick={() => onNavigate('savingsgoals')}>Savings Goals</button>
        <button style={styles.link} onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
} 