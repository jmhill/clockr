import * as hono from "@hono/hono";
import { basicAuth } from "@hono/hono/basic-auth";

const app = new hono.Hono();

app.get(
  "/",
  basicAuth({
    username: "demo",
    password: "demo",
  }),
  (c) =>
    c.html(
      <html>
        <body>
          <h1>Hello JSX</h1>
          <p>
            This is just a test to make sure that hono jsx rendering works as
            intended.
          </p>
        </body>
      </html>,
    ),
);

Deno.serve(app.fetch);
