// src/pages/Admin/CustomerManage.jsx

import { useState } from "react";

const CustomerManage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Janani",
      email: "janani@gmail.com",
      phone: "9876543210",
      packageName: "Ooty Escape",
      travelDate: "2026-06-20",
      travelers: 4,
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9876543211",
      packageName: "Munnar Tour",
      travelDate: "2026-06-25",
      travelers: 2,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.packageName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#064e3b" }}>Customer Management</h1>

      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          marginTop: "20px",
          marginBottom: "25px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#022c22",
                color: "white",
              }}
            >
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Package</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td style={tdStyle}>{customer.name}</td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.packageName}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    style={viewBtn}
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Customer Modal */}
      {selectedCustomer && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Customer Details</h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedCustomer.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedCustomer.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedCustomer.phone}
            </p>

            <p>
              <strong>Package:</strong>{" "}
              {selectedCustomer.packageName}
            </p>

            <p>
              <strong>Travel Date:</strong>{" "}
              {selectedCustomer.travelDate}
            </p>

            <p>
              <strong>Travelers:</strong>{" "}
              {selectedCustomer.travelers}
            </p>

            <button
              onClick={() => setSelectedCustomer(null)}
              style={closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};

const viewBtn = {
  background: "#0b6b43",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#064e3b",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "450px",
};

const closeBtn = {
  marginTop: "20px",
  background: "#022c22",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default CustomerManage;