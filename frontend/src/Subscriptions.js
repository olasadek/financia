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
    flexWrap: 'wrap',
    alignItems: 'center',
    background: '#102542',
    padding: '2rem',
    borderRadius: '12px',
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
  checkbox: {
    width: '24px',
    height: '24px',
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

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', amount: '', next_payment_date: '', active: true });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch(`${API}/subscriptions`).then(res => res.json()).then(data => {
      setSubs(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    const payload = { id: 0, ...form, amount: parseFloat(form.amount) };
    fetch(`${API}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(newSub => {
        setSubs([...subs, newSub]);
        setForm({ name: '', amount: '', next_payment_date: '', active: true });
      });
  };

  const handleDelete = id => {
    fetch(`${API}/subscriptions/${id}`, { method: 'DELETE' })
      .then(() => setSubs(subs.filter(s => s.id !== id)));
  };

  const startEdit = sub => {
    setEditId(sub.id);
    setEditForm({ ...sub });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleEdit = e => {
    e.preventDefault();
    const payload = { ...editForm, id: editId, amount: parseFloat(editForm.amount) };
    fetch(`${API}/subscriptions/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(updated => {
        setSubs(subs.map(s => (s.id === editId ? updated : s)));
        setEditId(null);
        setEditForm({});
      });
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.title}>Subscriptions</div>
        <form style={styles.form} onSubmit={handleAdd}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            style={styles.input}
            type="number"
            step="0.01"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            required
          />
          <input
            style={styles.input}
            type="date"
            value={form.next_payment_date}
            onChange={e => setForm(f => ({ ...f, next_payment_date: e.target.value }))}
            required
          />
          <label style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: '1.2rem' }}>
            <input
              style={styles.checkbox}
              type="checkbox"
              checked={form.active}
              onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
            /> Active
          </label>
          <button style={styles.button} type="submit">Add</button>
        </form>
        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : subs.length === 0 ? (
          <div style={styles.empty}>No subscriptions found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Next Payment</th>
                <th style={styles.th}>Active</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(sub => (
                editId === sub.id ? (
                  <tr key={sub.id}>
                    <td style={styles.td}>{sub.id}</td>
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
                        value={editForm.amount}
                        onChange={e => setEditForm(f => ({ ...f, amount: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="date"
                        value={editForm.next_payment_date}
                        onChange={e => setEditForm(f => ({ ...f, next_payment_date: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.checkbox}
                        type="checkbox"
                        checked={editForm.active}
                        onChange={e => setEditForm(f => ({ ...f, active: e.target.checked }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={handleEdit}>Save</button>
                      <button style={styles.actionBtn} onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={sub.id}>
                    <td style={styles.td}>{sub.id}</td>
                    <td style={styles.td}>{sub.name}</td>
                    <td style={styles.td}>{sub.amount}</td>
                    <td style={styles.td}>{sub.next_payment_date}</td>
                    <td style={styles.td}>{sub.active ? 'Yes' : 'No'}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => startEdit(sub)}>Edit</button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(sub.id)}>Delete</button>
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