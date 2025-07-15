import React, { useState } from 'react';
import Login from './Login';
import NavBar from './NavBar';
import Expenses from './Expenses';
import Categories from './Categories';
import Merchants from './Merchants';
import Subscriptions from './Subscriptions';
import SavingsGoals from './SavingsGoals';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('expenses');

  const handleLogout = () => {
    setUser(null);
    setPage('expenses');
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ color: '#fff', background: '#0a2342', minHeight: '100vh' }}>
      <NavBar onNavigate={setPage} onLogout={handleLogout} />
      {page === 'expenses' && <Expenses />}
      {page === 'categories' && <Categories />}
      {page === 'merchants' && <Merchants />}
      {page === 'subscriptions' && <Subscriptions />}
      {page === 'savingsgoals' && <SavingsGoals />}
    </div>
  );
}

export default App;
