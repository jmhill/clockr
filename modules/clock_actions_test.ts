import { beforeEach, describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { clockIn, clockOut, getAllTimeBlocksForUser } from "./clock_actions.ts";
import {
  clearUserActiveTimeBlock,
  deleteAllUserLoggedTimeBlocks,
} from "./time_block_store.ts";

describe("clockIn", () => {
  const userId = "1";
  beforeEach(() => clearUserActiveTimeBlock(userId));

  test("returns a new result and timeblock if no currently active block", () => {
    const result = clockIn(userId);
    expect(result.result).toBe("new");
    expect(result.timeBlock.userId).toBe(userId);
  });

  test("returns existing Active Block if already clocked in", () => {
    const result1 = clockIn(userId);
    expect(result1.result).toBe("new");

    const result2 = clockIn(userId);
    expect(result2.result).toBe("existing");
  });
});

describe("clockOut", () => {
  beforeEach(() => clearUserActiveTimeBlock(userId));
  const userId = "1";

  test("returns error message if no active block for user", () => {
    const result = clockOut(userId);
    expect(result).toBe(null);
  });

  test("returns a logged time block on success", () => {
    const clockInResult = clockIn(userId);
    const clockOutResult = clockOut(userId);

    if (clockOutResult === null) {
      throw new Error("Clockout result cannot be null");
    }

    expect(clockInResult.result).toBe("new");
    expect(clockOutResult).not.toBe(null);
    expect(clockInResult.timeBlock.startTime).toBe(
      clockOutResult.timeBlock.startTime,
    );
    expect(clockInResult.timeBlock.userId).toBe(
      clockOutResult.timeBlock.userId,
    );
    expect(clockOutResult.timeBlock.endTime).not.toBeLessThan(
      clockOutResult.timeBlock.startTime,
    );
  });
});

describe("getAllTimeBlocksForUser", () => {
  const userId = "1";
  beforeEach(() => deleteAllUserLoggedTimeBlocks(userId));

  test("returns null if no logged blocks for user", () => {
    const logged = getAllTimeBlocksForUser(userId);

    expect(logged).toBe(null);
  });

  test("returns correct number of logged blocks if any", () => {
    clockIn(userId);
    clockOut(userId);
    clockIn(userId);
    clockOut(userId);

    const logged = getAllTimeBlocksForUser(userId);
    expect(logged?.length).toBe(2);
  });
});
