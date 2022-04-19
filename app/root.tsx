import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { isAuthenticated } from "./auth.server";
import Navigation from "./components/Navigation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tecno Brega Stack",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  return {
    isAuthenticated: await isAuthenticated(request),
  };
};

export default function App() {
  const { isAuthenticated } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation isAuthenticated={isAuthenticated} />
        <Outlet context={{ isAuthenticated }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
