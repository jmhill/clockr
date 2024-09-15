const activeBlocks: Map<UserId, ActiveTimeBlock> = new Map();
const loggedBlocks: Map<UserId, LoggedTimeBlock[]> = new Map();

export const InMemoryStore: TimeBlockStore = {
  getUserActiveTimeBlock,
  setUserActiveTimeBlock,
  clearUserActiveTimeBlock,
  clearAllActiveTimeBlocks: clearActiveTimeBlocks,
  getUserLoggedTimeBlocks,
  deleteAllUserLoggedTimeBlocks,
  logTimeBlockEntry,
};

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

function clearUserActiveTimeBlock(userId: UserId) {
  activeBlocks.delete(userId);
}

function clearActiveTimeBlocks() {
  activeBlocks.clear();
}

function getUserLoggedTimeBlocks(userId: UserId) {
  const blocks = loggedBlocks.get(userId);
  return blocks || null;
}

function deleteAllUserLoggedTimeBlocks(userId: UserId) {
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
