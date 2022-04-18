import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { handleAuthSession, handleResponse } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { supabaseClient } = await handleAuthSession(request);

  const { data, error } = await supabaseClient.from("notes").select();

  return handleResponse(request, { data, error });
};

export const action: ActionFunction = async ({ request }) => {
  const { supabaseClient } = await handleAuthSession(request);

  const form = await request.formData();
  const content = form.get("content");

  const { error } = await supabaseClient.from("notes").insert([{ content }], {
    returning: "minimal",
  });

  return handleResponse(request, { data: null, error });
};

export default function Notes() {
  const { data: notes } = useLoaderData();
  return (
    <div>
      <h1>Notes</h1>
      <Form method="post">
        <input type="text" name="content" />
        <button>Create note</button>
      </Form>
      {notes && (
        <>
          <h2>Notes</h2>
          <ul>
            {notes.map((note: any) => (
              <li key={note.id}>{note.content}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
