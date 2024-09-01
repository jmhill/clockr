import {
  getUserActiveTimeBlock,
  getUserLoggedTimeBlocks,
  logTimeBlockEntry,
  setUserActiveTimeBlock,
} from "./time_block_store.ts";
import { type UserId } from "./user.ts";

type TimeBlockId = string;

export interface ActiveTimeBlock {
  timeBlockId: TimeBlockId;
  userId: UserId;
  startTime: number;
}

export interface LoggedTimeBlock extends ActiveTimeBlock {
  endTime: number;
}

export interface ClockInResult {
  result: "new" | "existing";
  timeBlock: ActiveTimeBlock;
}

export interface ClockOutResult {
  timeBlock: LoggedTimeBlock;
}

// Clocking In and Out

export function clockIn(userId: UserId): ClockInResult {
  const currentUserActiveTimeBlock = getUserActiveTimeBlock(userId);

  if (currentUserActiveTimeBlock === null) {
    const newBlock = {
      timeBlockId: "1",
      userId,
      startTime: Date.now(),
    };
    setUserActiveTimeBlock(userId, newBlock);
    return { result: "new", timeBlock: newBlock };
  }

  return { result: "existing", timeBlock: currentUserActiveTimeBlock };
}

export function clockOut(userId: UserId): ClockOutResult | null {
  const activeBlock = getUserActiveTimeBlock(userId);

  if (activeBlock === null) {
    return null;
  }

  const result: ClockOutResult = {
    timeBlock: { ...activeBlock, endTime: Date.now() },
  };
  logTimeBlockEntry(result.timeBlock);
  return result;
}

export function getAllTimeBlocksForUser(userId: UserId) {
  const blocks = getUserLoggedTimeBlocks(userId);
  return blocks;
}
