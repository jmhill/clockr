import { describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { InMemoryStore } from "./time_block_store.ts";
import { ActiveTimeBlock } from "./clock_actions.ts";

const { setUserActiveTimeBlock } = InMemoryStore;

// describe("in-memory store active time block", () => {
//   test("adds item to store if no active block", () => {
//     const userId = "1";
//     // TODO: need timeblock creation helper
//     // const timeBlock : ActiveTimeBlock = {
//     //   userId,
//     //   startTime: Date.now()
//     // }
//     const stored = setUserActiveTimeBlock(userId);
//     console.log(stored);
//   });
// });
