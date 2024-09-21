import { beforeEach, describe, test } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { init } from "./clock_actions.ts";
import { InMemoryStore } from "../time_block/infrastructure/time_block_in_memory_store.ts";
import { createUserId } from "../users/user.ts";

const { clockIn, clockOut, getAllLoggedBlocks } = init(InMemoryStore);
const { clearUserActiveTimeBlock, deleteAllUserLoggedTimeBlocks } =
  InMemoryStore;

describe("clockIn", () => {
  const userId = createUserId();
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
    expect(result2.timeBlock).toEqual(result1.timeBlock);
  });
});

describe("clockOut", () => {
  beforeEach(() => clearUserActiveTimeBlock(userId));
  const userId = createUserId();

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
  const userId = createUserId();
  beforeEach(() => deleteAllUserLoggedTimeBlocks(userId));

  test("returns null if no logged blocks for user", () => {
    const logged = getAllLoggedBlocks(userId);

    expect(logged).toBe(null);
  });

  test("returns correct number of logged blocks if any", () => {
    clockIn(userId);
    clockOut(userId);
    clockIn(userId);
    clockOut(userId);

    const logged = getAllLoggedBlocks(userId);
    expect(logged?.length).toBe(2);
  });
});
