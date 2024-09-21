import { describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect/expect";

import { createUserId } from "./user.ts";
import { validate } from "jsr:@std/uuid";

describe("user ids", () => {
  test("user id must be valid uuid", () => {
    const id = createUserId();
    const isValidUuid = validate;
    expect(isValidUuid(id)).toBe(true);
  });
});
