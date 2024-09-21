import { expect } from "jsr:@std/expect";
import { describe, test } from "jsr:@std/testing/bdd";
import { validate } from "jsr:@std/uuid";

import { createActiveTimeBlock } from "./time_block.ts";
import { createUserId } from "../../users/user.ts";

describe("createActiveTimeBlock", () => {
  test("uses valid uuid as identifier", () => {
    const timeBlock = createActiveTimeBlock(createUserId());
    expect(validate(timeBlock.timeBlockId)).toBe(true);
  });
});
