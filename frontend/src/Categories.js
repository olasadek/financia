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
    maxWidth: '600px',
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
    justifyContent: 'center',
  },
  input: {
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

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch(`${API}/categories`).then(res => res.json()).then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    const payload = { id: 0, name: form.name };
    fetch(`${API}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(newCat => {
        setCategories([...categories, newCat]);
        setForm({ name: '' });
      });
  };

  const handleDelete = id => {
    fetch(`${API}/categories/${id}`, { method: 'DELETE' })
      .then(() => setCategories(categories.filter(c => c.id !== id)));
  };

  const startEdit = cat => {
    setEditId(cat.id);
    setEditForm({ ...cat });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleEdit = e => {
    e.preventDefault();
    const payload = { ...editForm, id: editId };
    fetch(`${API}/categories/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(updated => {
        setCategories(categories.map(c => (c.id === editId ? updated : c)));
        setEditId(null);
        setEditForm({});
      });
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.title}>Categories</div>
        <form style={styles.form} onSubmit={handleAdd}>
          <input
            style={styles.input}
            type="text"
            placeholder="Category name"
            value={form.name}
            onChange={e => setForm({ name: e.target.value })}
            required
          />
          <button style={styles.button} type="submit">Add</button>
        </form>
        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : categories.length === 0 ? (
          <div style={styles.empty}>No categories found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                editId === cat.id ? (
                  <tr key={cat.id}>
                    <td style={styles.td}>{cat.id}</td>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={handleEdit}>Save</button>
                      <button style={styles.actionBtn} onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={cat.id}>
                    <td style={styles.td}>{cat.id}</td>
                    <td style={styles.td}>{cat.name}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => startEdit(cat)}>Edit</button>
                      <button style={styles.actionBtn} onClick={() => handleDelete(cat.id)}>Delete</button>
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