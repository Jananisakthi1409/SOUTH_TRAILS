// src/pages/Auth/Login.jsx
import loginImage from "../Auth/loginimage.webp";

const Login = () => {
  return (
    <main className="auth-login-page">
      <div className="login-split">
        <aside className="login-side login-art">
          <div className="login-image-wrap">
            <img src={loginImage} alt="South India travel map illustration" />
          </div>
        </aside>

        <section className="login-side login-form-side">
  <div className="login-card glass-card">
    <span className="login-badge">South Trails Admin</span>

    <div className="login-intro">
      <h1>Admin Portal</h1>
      <p>
        Manage tour packages, customer bookings, and website operations.
      </p>
    </div>

    <form
      className="auth-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <label>
        Admin Email
        <input
          type="email"
          placeholder="admin@southtrails.com"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Enter admin password"
        />
      </label>

      <div className="login-meta">
        <label className="checkbox-label">
          <input type="checkbox" />
          Remember Me
        </label>
      </div>

      <button
        className="button button-primary"
        type="submit"
      >
        Login to Dashboard
      </button>
    </form>

    <div className="login-tags">
      Dashboard • Packages • Customers • Bookings
    </div>

    <p className="login-caption">
      Authorized Personnel Only
    </p>
  </div>
</section>
      </div>
    </main>
  );
};

export default Login;
