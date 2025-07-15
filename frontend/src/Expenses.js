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
    maxWidth: '900px',
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
    fontSize: '2.5rem',
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
  select: {
    padding: '1rem',
    borderRadius: '8px',
    border: '2px solid #193b6a',
    background: '#1b3358',
    color: '#fff',
    fontSize: '1.2rem',
    minWidth: '200px',
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

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    amount: '',
    date: '',
    category_id: '',
    merchant_id: '',
    description: '',
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch expenses, categories, merchants
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/expenses`).then(res => res.json()),
      fetch(`${API}/categories`).then(res => res.json()),
      fetch(`${API}/merchants`).then(res => res.json()),
    ]).then(([expenses, categories, merchants]) => {
      setExpenses(expenses);
      setCategories(categories);
      setMerchants(merchants);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Add expense
  const handleAdd = e => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      category_id: parseInt(form.category_id),
      merchant_id: form.merchant_id ? parseInt(form.merchant_id) : null,
      id: 0, // backend will assign
      date: form.date,
    };
    fetch(`${API}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(newExp => {
        setExpenses([...expenses, newExp]);
        setForm({ amount: '', date: '', category_id: '', merchant_id: '', description: '' });
      });
  };

  // Delete expense
  const handleDelete = id => {
    fetch(`${API}/expenses/${id}`, { method: 'DELETE' })
      .then(() => setExpenses(expenses.filter(e => e.id !== id)));
  };

  // Start editing
  const startEdit = exp => {
    setEditId(exp.id);
    setEditForm({ ...exp });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  // Save edit
  const handleEdit = e => {
    e.preventDefault();
    const payload = {
      ...editForm,
      amount: parseFloat(editForm.amount),
      category_id: parseInt(editForm.category_id),
      merchant_id: editForm.merchant_id ? parseInt(editForm.merchant_id) : null,
      id: editId,
      date: editForm.date,
    };
    fetch(`${API}/expenses/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(updated => {
        setExpenses(expenses.map(e => (e.id === editId ? updated : e)));
        setEditId(null);
        setEditForm({});
      });
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.title}>Expenses</div>
        {/* Add Expense Form */}
        <form style={styles.form} onSubmit={handleAdd}>
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
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
          />
          <select
            style={styles.select}
            value={form.category_id}
            onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
            required
          >
            <option value="">Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            style={styles.select}
            value={form.merchant_id}
            onChange={e => setForm(f => ({ ...f, merchant_id: e.target.value }))}
          >
            <option value="">Merchant (optional)</option>
            {merchants.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <input
            style={styles.input}
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <button style={styles.button} type="submit">Add</button>
        </form>
        {/* Expenses Table */}
        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : expenses.length === 0 ? (
          <div style={styles.empty}>No expenses found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Merchant</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                editId === exp.id ? (
                  <tr key={exp.id}>
                    <td style={styles.td}>{exp.id}</td>
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
                        value={editForm.date}
                        onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <select
                        style={styles.select}
                        value={editForm.category_id}
                        onChange={e => setEditForm(f => ({ ...f, category_id: e.target.value }))}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <select
                        style={styles.select}
                        value={editForm.merchant_id || ''}
                        onChange={e => setEditForm(f => ({ ...f, merchant_id: e.target.value }))}
                      >
                        <option value="">-</option>
                        {merchants.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="text"
                        value={editForm.description || ''}
                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={handleEdit}>Save</button>
                      <button style={styles.actionBtn} onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={exp.id}>
                    <td style={styles.td}>{exp.id}</td>
                    <td style={styles.td}>{exp.amount}</td>
                    <td style={styles.td}>{exp.date}</td>
                    <td style={styles.td}>{categories.find(c => c.id === exp.category_id)?.name || exp.category_id}</td>
                    <td style={styles.td}>{merchants.find(m => m.id === exp.merchant_id)?.name || '-'}</td>
                    <td style={styles.td}>{exp.description || '-'}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => startEdit(exp)}>Edit</button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(exp.id)}>Delete</button>
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