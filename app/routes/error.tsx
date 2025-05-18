// app/routes/error.tsx

import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type LoaderData = {
  message: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const message = url.searchParams.get("message") ?? "An unknown error occurred.";
  const data: LoaderData = { message };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};


export default function ErrorPage() {
  const { message } = useLoaderData<LoaderData>();

  return (
    <div style={{ padding: "2rem", color: "crimson" }}>
      <h1>Error</h1>
      <p>{message}</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}