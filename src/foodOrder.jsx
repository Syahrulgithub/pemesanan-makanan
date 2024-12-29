// src/FoodOrder.jsx
import React, { useState } from "react";
import "./FoodOrder.css";

const FoodOrder = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedItems = foodItems.map((item, index) =>
        index === editIndex ? foodName : item
      );
      setFoodItems(updatedItems);
      setEditIndex(null);
    } else {
      setFoodItems([...foodItems, foodName]);
    }
    setFoodName("");
  };

  const handleEdit = (index) => {
    setFoodName(foodItems[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(updatedItems);
  };

  const filteredItems = foodItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Pemesanan Makanan</h1>
      <div className="input-group">
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Nama Makanan"
          className="input-field"
        />
        <button onClick={handleAddOrUpdate} className="btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari Makanan"
        className="search-field"
      />
      <ul className="food-list">
        {filteredItems.map((item, index) => (
          <li key={index} className="food-item">
            <img
              src={`https://via.placeholder.com/50?text=${item}`}
              alt={item}
              className="food-image"
            />
            <span className="food-name">{item}</span>
            <div className="button-group">
              <button
                onClick={() => handleEdit(index)}
                className="btn edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="btn delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodOrder;
