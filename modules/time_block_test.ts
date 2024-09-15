import { expect } from "jsr:@std/expect";
import { describe, test } from "jsr:@std/testing/bdd";
import { validate } from "jsr:@std/uuid";

import { createUserId } from "./user.ts";
import { createActiveTimeBlock } from "./time_block.ts";

describe("createActiveTimeBlock", () => {
  test("uses valid uuid as identifier", () => {
    const timeBlock = createActiveTimeBlock(createUserId());
    expect(validate(timeBlock.timeBlockId)).toBe(true);
  });
});
