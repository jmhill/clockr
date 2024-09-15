import {
  type ActiveTimeBlock,
  createActiveTimeBlock,
  createLoggedTimeBlock,
  type LoggedTimeBlock,
} from "./time_block.ts";
import { type TimeBlockStore } from "./time_block_store.ts";
import { type UserId } from "./user.ts";

export interface ClockInResult {
  result: "new" | "existing";
  timeBlock: ActiveTimeBlock;
}

export interface ClockOutResult {
  timeBlock: LoggedTimeBlock;
}

type ClockInAction = (userId: UserId) => ClockInResult;
type ClockOutAction = (userId: UserId) => ClockOutResult | null;
type GetAllTimeBlocksQuery = (userId: UserId) => LoggedTimeBlock[] | null;

interface ClockActions {
  clockIn: ClockInAction;
  clockOut: ClockOutAction;
  getAllLoggedBlocks: GetAllTimeBlocksQuery;
}

type ClockActionsInit = (timeBlockStore: TimeBlockStore) => ClockActions;

// Clocking In and Out
type InitClockIn = (timeBlockStore: TimeBlockStore) => ClockInAction;
type InitClockOut = (timeBlockStore: TimeBlockStore) => ClockOutAction;
type InitGetAllLoggedBlocks = (
  timeBlockStore: TimeBlockStore,
) => GetAllTimeBlocksQuery;

const clockIn: InitClockIn =
  (timeBlockStore: TimeBlockStore) => (userId: UserId) => {
    const { getUserActiveTimeBlock, setUserActiveTimeBlock } = timeBlockStore;
    const currentUserActiveTimeBlock = getUserActiveTimeBlock(userId);

    if (currentUserActiveTimeBlock === null) {
      const newBlock = createActiveTimeBlock(userId);
      setUserActiveTimeBlock(userId, newBlock);
      return { result: "new", timeBlock: newBlock } as ClockInResult;
    }

    return {
      result: "existing",
      timeBlock: currentUserActiveTimeBlock,
    } as ClockInResult;
  };

const clockOut: InitClockOut =
  (timeBlockStore: TimeBlockStore) => (userId: UserId) => {
    const { getUserActiveTimeBlock, logTimeBlockEntry } = timeBlockStore;
    const activeBlock = getUserActiveTimeBlock(userId);

    if (activeBlock === null) {
      return null;
    }

    const result: ClockOutResult = {
      timeBlock: createLoggedTimeBlock(activeBlock),
    };
    logTimeBlockEntry(result.timeBlock);
    return result;
  };

const getAllTimeBlocksForUser: InitGetAllLoggedBlocks =
  (timeBlockStore: TimeBlockStore) => (userId: UserId) => {
    const { getUserLoggedTimeBlocks } = timeBlockStore;
    const blocks = getUserLoggedTimeBlocks(userId);
    return blocks;
  };

export const init: ClockActionsInit = (timeBlockStore) => ({
  clockIn: clockIn(timeBlockStore),
  clockOut: clockOut(timeBlockStore),
  getAllLoggedBlocks: getAllTimeBlocksForUser(timeBlockStore),
});
