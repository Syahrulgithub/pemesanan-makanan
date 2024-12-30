// src/AdminOrderPage.jsx
import React, { useState } from "react";
import "./AdminOrderPage.css"; // Impor CSS jika diperlukan

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddOrder = () => {
    if (
      customerName.trim() === "" ||
      foodItem.trim() === "" ||
      quantity.trim() === ""
    )
      return;

    const newOrder = { customerName, foodItem, quantity };

    if (editIndex !== null) {
      const updatedOrders = orders.map((order, index) =>
        index === editIndex ? newOrder : order
      );
      setOrders(updatedOrders);
      setEditIndex(null);
    } else {
      setOrders([...orders, newOrder]);
    }

    // Reset input fields
    setCustomerName("");
    setFoodItem("");
    setQuantity("");
  };

  const handleEditOrder = (index) => {
    const orderToEdit = orders[index];
    setCustomerName(orderToEdit.customerName);
    setFoodItem(orderToEdit.foodItem);
    setQuantity(orderToEdit.quantity);
    setEditIndex(index);
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.foodItem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Admin Pemesanan Makanan</h1>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Nama Pelanggan"
      />
      <input
        type="text"
        value={foodItem}
        onChange={(e) => setFoodItem(e.target.value)}
        placeholder="Nama Makanan"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Jumlah"
      />
      <button onClick={handleAddOrder}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cari pemesanan"
        />
      </div>
      <ul>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            <div>
              <strong>Pelanggan:</strong> {order.customerName} -{" "}
              <strong>Makanan:</strong> {order.foodItem} -{" "}
              <strong>Jumlah:</strong> {order.quantity}
            </div>
            <div>
              <button onClick={() => handleEditOrder(index)}>Edit</button>
              <button onClick={() => handleDeleteOrder(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderPage;
