import React, { useEffect, useState } from 'react';

const styles = {
  outer: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '700px',
    width: '100%',
    margin: '2rem auto',
    background: '#193b6a',
    borderRadius: '18px',
    padding: '3rem',
    color: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    letterSpacing: '2px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '2rem',
    fontSize: '1.3rem',
  },
  th: {
    background: '#102542',
    color: '#fff',
    padding: '1.2rem',
    borderBottom: '3px solid #1e5ab6',
    fontSize: '1.2rem',
  },
  td: {
    padding: '1.1rem',
    borderBottom: '2px solid #1b3358',
    textAlign: 'center',
    fontSize: '1.1rem',
  },
  empty: {
    textAlign: 'center',
    color: '#b0c4de',
    marginTop: '2rem',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
    alignItems: 'center',
    background: '#102542',
    padding: '2rem',
    borderRadius: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    padding: '1rem',
    borderRadius: '8px',
    border: '2px solid #193b6a',
    background: '#1b3358',
    color: '#fff',
    fontSize: '1.2rem',
    minWidth: '180px',
  },
  button: {
    padding: '1rem 2.5rem',
    borderRadius: '8px',
    border: 'none',
    background: '#1e5ab6',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginTop: '0.5rem',
  },
  actionBtn: {
    margin: '0 0.5rem',
    padding: '0.7rem 1.5rem',
    fontSize: '1.1rem',
    borderRadius: '7px',
    border: 'none',
    cursor: 'pointer',
    background: '#1e5ab6',
    color: '#fff',
  },
};

const API = 'http://localhost:8000';

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', target_amount: '', current_amount: '', due_date: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch(`${API}/savings-goals`).then(res => res.json()).then(data => {
      setGoals(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    const payload = {
      id: 0,
      name: form.name,
      target_amount: parseFloat(form.target_amount),
      current_amount: form.current_amount ? parseFloat(form.current_amount) : 0,
      due_date: form.due_date || null,
    };
    fetch(`${API}/savings-goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(newGoal => {
        setGoals([...goals, newGoal]);
        setForm({ name: '', target_amount: '', current_amount: '', due_date: '' });
      });
  };

  const handleDelete = id => {
    fetch(`${API}/savings-goals/${id}`, { method: 'DELETE' })
      .then(() => setGoals(goals.filter(g => g.id !== id)));
  };

  const startEdit = goal => {
    setEditId(goal.id);
    setEditForm({ ...goal });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleEdit = e => {
    e.preventDefault();
    const payload = {
      ...editForm,
      id: editId,
      target_amount: parseFloat(editForm.target_amount),
      current_amount: editForm.current_amount ? parseFloat(editForm.current_amount) : 0,
      due_date: editForm.due_date || null,
    };
    fetch(`${API}/savings-goals/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(updated => {
        setGoals(goals.map(g => (g.id === editId ? updated : g)));
        setEditId(null);
        setEditForm({});
      });
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.title}>Savings Goals</div>
        <form style={styles.form} onSubmit={handleAdd}>
          <input
            style={styles.input}
            type="text"
            placeholder="Goal name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            style={styles.input}
            type="number"
            step="0.01"
            placeholder="Target amount"
            value={form.target_amount}
            onChange={e => setForm(f => ({ ...f, target_amount: e.target.value }))}
            required
          />
          <input
            style={styles.input}
            type="number"
            step="0.01"
            placeholder="Current amount"
            value={form.current_amount}
            onChange={e => setForm(f => ({ ...f, current_amount: e.target.value }))}
          />
          <input
            style={styles.input}
            type="date"
            value={form.due_date}
            onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
          />
          <button style={styles.button} type="submit">Add</button>
        </form>
        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : goals.length === 0 ? (
          <div style={styles.empty}>No savings goals found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Target</th>
                <th style={styles.th}>Current</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map(goal => (
                editId === goal.id ? (
                  <tr key={goal.id}>
                    <td style={styles.td}>{goal.id}</td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="number"
                        step="0.01"
                        value={editForm.target_amount}
                        onChange={e => setEditForm(f => ({ ...f, target_amount: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="number"
                        step="0.01"
                        value={editForm.current_amount}
                        onChange={e => setEditForm(f => ({ ...f, current_amount: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="date"
                        value={editForm.due_date || ''}
                        onChange={e => setEditForm(f => ({ ...f, due_date: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={handleEdit}>Save</button>
                      <button style={styles.actionBtn} onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={goal.id}>
                    <td style={styles.td}>{goal.id}</td>
                    <td style={styles.td}>{goal.name}</td>
                    <td style={styles.td}>{goal.target_amount}</td>
                    <td style={styles.td}>{goal.current_amount}</td>
                    <td style={styles.td}>{goal.due_date || '-'}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => startEdit(goal)}>Edit</button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(goal.id)}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 