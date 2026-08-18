import { Link } from "react-router-dom";
import "../../components/advanced/AdvancedUI.css";

const customerFlow = [
  { label: "Home", path: "/", note: "Start browsing South Trails" },
  { label: "Packages", path: "/packages", note: "Search, filter, compare, and save" },
  { label: "State Packages", path: "/states/kerala", note: "Explore regional travel options" },
  { label: "Package Details", path: "/package/kera-munnar-family", note: "Gallery, itinerary, reviews, and price" },
  { label: "Book Now", path: "/package/kera-munnar-family", note: "Open booking form" },
  { label: "Login / Signup Check", path: "/login", note: "Protect booking continuation" },
  { label: "Booking Form", path: "/package/kera-munnar-family", note: "Traveler info, date, payment option" },
  { label: "Booking Saved", path: "/profile/bookings", note: "Stored through Spring Boot booking API" },
  { label: "Booking Success", path: "/booking-success/demo", note: "Confirmation and next steps" },
  { label: "Profile", path: "/profile", note: "Account, wishlist board, reviews" },
  { label: "My Bookings", path: "/profile/bookings", note: "Booking timeline and trip status" },
];

const adminFlow = [
  { label: "Admin Login", path: "/admin/login", note: "Protected admin entry" },
  { label: "Admin Dashboard", path: "/admin/dashboard", note: "Metrics and recent activity" },
  { label: "Bookings", path: "/admin/bookings", note: "View and update booking records" },
  { label: "Kanban", path: "/admin/kanban", note: "Drag booking status columns" },
  { label: "Packages", path: "/admin/packages", note: "Create, edit, upload images" },
  { label: "Users", path: "/admin/users", note: "Manage registered users" },
  { label: "Analytics", path: "/admin/analytics", note: "Revenue, package, and booking insights" },
];

const advancedFlow = [
  { label: "AI Trip Builder", path: "/trip-builder" },
  { label: "Map Explorer", path: "/map" },
  { label: "Mood Quiz", path: "/mood-quiz" },
  { label: "Command Search", path: "/packages" },
];

const FlowTrack = ({ title, description, items }) => (
  <section className={`flow-section flow-lane ${title.includes("Admin") ? "flow-lane-admin" : "flow-lane-customer"}`}>
    <div className="flow-section-heading">
      <div>
        <p className="eyebrow">{title}</p>
        <h2>{description}</h2>
      </div>
      <span>{items.length} steps</span>
    </div>

    <div className="flow-route-line" />
    <div className="flow-track flow-track-premium">
      {items.map((item, index) => (
        <article key={`${item.label}-${index}`} className="flow-step-card flow-checkpoint">
          <div className="flow-step-number">{index + 1}</div>
          <div>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
            <Link className="flow-open-link" to={item.path}>Open step</Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const WebsiteFlow = () => {
  return (
    <main className="advanced-page flow-page">
      <div className="advanced-page-inner">
        <section className="flow-command-hero">
          <div className="flow-hero-copy">
            <p className="eyebrow flow-eyebrow">Website Flow</p>
            <h1>Complete South Trails user and admin journey</h1>
            <p>
              This page shows how visitors move from discovery to booking, and how admins manage the same data after login.
            </p>
            <div className="flow-hero-actions">
              <Link className="button button-primary" to="/packages">Start Customer Flow</Link>
              <Link className="button button-secondary" to="/admin/login">Open Admin Login</Link>
            </div>
          </div>

          <aside className="flow-tool-panel">
            <p className="eyebrow">Advanced Tools</p>
            <h2>Shortcut Deck</h2>
            <div className="flow-mini-grid">
              {advancedFlow.map((item) => (
                <Link key={item.label} to={item.path} className="flow-mini-card">
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="flow-metrics-strip" aria-label="Flow summary">
          <div>
            <strong>{customerFlow.length}</strong>
            <span>customer checkpoints</span>
          </div>
          <div>
            <strong>{adminFlow.length}</strong>
            <span>admin checkpoints</span>
          </div>
          <div>
            <strong>2</strong>
            <span>connected journeys</span>
          </div>
        </section>

        <FlowTrack
          title="Customer Journey"
          description="Home to booking success to profile"
          items={customerFlow}
        />

        <FlowTrack
          title="Admin Journey"
          description="Login to operations, packages, users, and analytics"
          items={adminFlow}
        />
      </div>
    </main>
  );
};

export default WebsiteFlow;
