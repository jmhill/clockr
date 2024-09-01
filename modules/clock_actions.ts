type UserId = string;
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

// Time Block Store

const activeBlocks: Map<UserId, ActiveTimeBlock> = new Map();
const loggedBlocks: Map<UserId, LoggedTimeBlock[]> = new Map();

function getUserActiveTimeBlock(userId: UserId): ActiveTimeBlock | null {
  const block = activeBlocks.get(userId);
  return block || null;
}

function setUserActiveTimeBlock(
  userId: UserId,
  timeBlock: ActiveTimeBlock,
): ActiveTimeBlock {
  activeBlocks.set(userId, timeBlock);
  return timeBlock;
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

function logTimeBlockEntry(loggedTime: LoggedTimeBlock) {
  const userId = loggedTime.userId;
  const logs = loggedBlocks.get(userId);
  if (logs) {
    logs.push(loggedTime);
  } else {
    loggedBlocks.set(userId, [loggedTime]);
  }
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
