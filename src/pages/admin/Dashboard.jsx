// src/pages/Admin/Dashboard.jsx

import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Packages",
      count: 24,
      icon: "📦",
    },
    {
      title: "Customers",
      count: 152,
      icon: "👥",
    },
    {
      title: "Bookings",
      count: 89,
      icon: "🧳",
    },
    {
      title: "Revenue",
      count: "₹2.4L",
      icon: "💰",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          color: "white",
          padding: "30px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          South Trails
        </h2>

        <nav
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }}
>
  <Link style={linkStyle}>📊 Dashboard</Link>

  <Link to="/admin/packages" style={linkStyle}>
    📦 Packages
  </Link>

  <Link to="/admin/customers" style={linkStyle}>
    👥 Customers
  </Link>

  <Link to="/admin/login" style={linkStyle}>
    🚪 Logout
  </Link>
</nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#1e293b",
          }}
        >
          Welcome Admin 👋
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Manage packages, customers and bookings from one place.
        </p>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{item.icon}</h2>

              <h3
                style={{
                  color: "#475569",
                }}
              >
                {item.title}
              </h3>

              <h1
                style={{
                  color: "#0ea5e9",
                  marginTop: "10px",
                }}
              >
                {item.count}
              </h1>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Recent Bookings
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={tableHead}>Customer</th>
                <th style={tableHead}>Package</th>
                <th style={tableHead}>Date</th>
                <th style={tableHead}>Travelers</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={tableCell}>Janani</td>
                <td style={tableCell}>Kerala Explorer</td>
                <td style={tableCell}>12 Jun 2026</td>
                <td style={tableCell}>4</td>
              </tr>

              <tr>
                <td style={tableCell}>Rahul</td>
                <td style={tableCell}>Coorg Escape</td>
                <td style={tableCell}>15 Jun 2026</td>
                <td style={tableCell}>2</td>
              </tr>

              <tr>
                <td style={tableCell}>Priya</td>
                <td style={tableCell}>Ooty Retreat</td>
                <td style={tableCell}>18 Jun 2026</td>
                <td style={tableCell}>5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  background: "#1e293b",
};

const tableHead = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default Dashboard;