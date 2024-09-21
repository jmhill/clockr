import * as hono from "@hono/hono";

const app = new hono.Hono();

app.get("/", (c) => c.text("hono works!!!!"));

Deno.serve(app.fetch);
