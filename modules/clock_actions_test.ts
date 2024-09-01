import { describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import {
  clearActiveTimeBlocks,
  clockIn,
  clockOut,
  deleteAllUserLoggedTimeBlocks,
  getAllTimeBlocksForUser,
} from "./clock_actions.ts";

describe("clockIn", () => {
  test("returns a new result and timeblock if no currently active block", () => {
    // Setup
    clearActiveTimeBlocks();
    const userId = "1";

    const result = clockIn(userId);
    expect(result.result).toBe("new");
    expect(result.timeBlock.userId).toBe(userId);
  });
  test("returns existing Active Block if already clocked in", () => {
    // Setup
    clearActiveTimeBlocks();
    const userId = "1";

    const result1 = clockIn(userId);
    expect(result1.result).toBe("new");

    const result2 = clockIn(userId);
    expect(result2.result).toBe("existing");
  });
});

describe("clockOut", () => {
  test("returns error message if no active block for user", () => {
    clearActiveTimeBlocks();
    const userId = "1";

    const result = clockOut(userId);
    expect(result).toBe(null);
  });
  test("returns a logged time block on success", () => {
    clearActiveTimeBlocks();
    const userId = "1";

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
  test("returns null if no logged blocks for user", () => {
    const userId = "1";
    deleteAllUserLoggedTimeBlocks(userId);

    const logged = getAllTimeBlocksForUser(userId);

    expect(logged).toBe(null);
  });
  test("returns correct number of logged blocks if any", () => {
    const userId = "1";
    deleteAllUserLoggedTimeBlocks(userId);

    clockIn(userId);
    clockOut(userId);
    clockIn(userId);
    clockOut(userId);

    const logged = getAllTimeBlocksForUser(userId);
    expect(logged?.length).toBe(2);
  });
});
