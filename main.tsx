import * as hono from "@hono/hono";

const app = new hono.Hono();

app.get("/", (c) => c.html(
  <html>
    <body>
      <h1>Hello JSX</h1>
      <p>This is just a test to make sure that hono jsx rendering works as intended.</p>
    </body>
  </html>  
));

Deno.serve(app.fetch);
