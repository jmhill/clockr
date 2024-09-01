import { ActiveTimeBlock, LoggedTimeBlock } from "./clock_actions.ts";
import { type UserId } from "./user.ts";
// Time Block Store

const activeBlocks: Map<UserId, ActiveTimeBlock> = new Map();
const loggedBlocks: Map<UserId, LoggedTimeBlock[]> = new Map();

export function getUserActiveTimeBlock(userId: UserId): ActiveTimeBlock | null {
  const block = activeBlocks.get(userId);
  return block || null;
}

export function setUserActiveTimeBlock(
  userId: UserId,
  timeBlock: ActiveTimeBlock,
): ActiveTimeBlock {
  activeBlocks.set(userId, timeBlock);
  return timeBlock;
}

export function clearUserActiveTimeBlock(userId: UserId) {
  activeBlocks.delete(userId);
}

export function clearActiveTimeBlocks() {
  activeBlocks.clear();
}

export function getUserLoggedTimeBlocks(userId: UserId) {
  const blocks = loggedBlocks.get(userId);
  return blocks || null;
}

export function deleteAllUserLoggedTimeBlocks(userId: UserId) {
  loggedBlocks.delete(userId);
}

export function logTimeBlockEntry(loggedTime: LoggedTimeBlock) {
  const userId = loggedTime.userId;
  const logs = loggedBlocks.get(userId);
  if (logs) {
    logs.push(loggedTime);
  } else {
    loggedBlocks.set(userId, [loggedTime]);
  }
}
