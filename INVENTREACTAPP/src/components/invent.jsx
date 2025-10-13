// src/components/Invent.jsx
import React, { useEffect, useState } from "react";
import config from "./config";
import "./style.css";

const Invent = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    try {
      const response = await fetch(config.BASE_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${config.BASE_URL}/${editId}` : config.BASE_URL;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ name: "", category: "", quantity: "", description: "" });
      setEditId(null);
      fetchItems();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await fetch(`${config.BASE_URL}/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="invent-container">
      <h1>Inventory Management</h1>

      <form onSubmit={handleSubmit} className="invent-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">{editId ? "Update Item" : "Add Item"}</button>
      </form>

      <div className="invent-list">
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Invent;
