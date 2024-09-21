import { UserId } from "../../users/user.ts";
import { type ActiveTimeBlock, type LoggedTimeBlock } from "./time_block.ts";

export interface TimeBlockStore {
  getUserActiveTimeBlock: (userId: UserId) => ActiveTimeBlock | null;
  setUserActiveTimeBlock: (
    userId: UserId,
    timeBlock: ActiveTimeBlock,
  ) => ActiveTimeBlock;
  clearUserActiveTimeBlock: (userId: UserId) => void;
  clearAllActiveTimeBlocks: () => void;
  getUserLoggedTimeBlocks: (userId: UserId) => LoggedTimeBlock[] | null;
  deleteAllUserLoggedTimeBlocks: (userId: UserId) => void;
  logTimeBlockEntry: (loggedTimeBlock: LoggedTimeBlock) => void;
}
