import { Form, Link, Outlet } from "react-router";
import type { Route } from "./+types/sidebar";

import { getContacts } from "../data";

export async function loader() {
  const contacts = await getContacts();

  return { contacts };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;

  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="about">About</Link>
        </h1>
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div aria-hidden hidden={true} id="search-spinner" />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.length ? (
              contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last
                      ? `${contact.first} ${contact.last}`
                      : null}
                  </Link>
                </li>
              ))
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
