import { describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { InMemoryStore } from "./time_block_store.ts";
import { type ActiveTimeBlock, createActiveTimeBlock } from "./time_block.ts";
import { createUserId } from "./user.ts";

const { setUserActiveTimeBlock, getUserActiveTimeBlock } = InMemoryStore;

describe("in-memory store active time block", () => {
  test("adds item to store if no active block", () => {
    const userId = createUserId();
    const timeBlock: ActiveTimeBlock = createActiveTimeBlock(userId);
    setUserActiveTimeBlock(userId, timeBlock);
    expect(getUserActiveTimeBlock(userId)).toEqual(timeBlock);
  });
});
