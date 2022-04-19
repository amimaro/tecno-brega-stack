import { Form, NavLink } from "@remix-run/react";

export default function Navigation({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <NavLink to="/">Home</NavLink>
      {!isAuthenticated && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/create-account">Create account</NavLink>
        </>
      )}
      {isAuthenticated && (
        <>
          <NavLink to="/notes">Notes</NavLink>
          <Form method="post" action="/auth-actions/logout">
            <button>Logout</button>
          </Form>
        </>
      )}
    </nav>
  );
}
