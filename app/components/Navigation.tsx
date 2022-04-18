import { Form, NavLink } from "@remix-run/react";

export default function Navigation() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/create-account">Create account</NavLink>
      <NavLink to="/notes">Notes</NavLink>
      <Form method="post" action="/auth-actions/logout">
        <button>Logout</button>
      </Form>
    </nav>
  );
}
