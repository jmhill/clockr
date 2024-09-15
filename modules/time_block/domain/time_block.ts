import { type UserId } from "../user.ts";

export type TimeBlockId = string;

export interface ActiveTimeBlock {
  timeBlockId: TimeBlockId;
  userId: UserId;
  startTime: number;
}

export interface LoggedTimeBlock extends ActiveTimeBlock {
  endTime: number;
}

const createTimeBlockId = () => crypto.randomUUID();

export const createActiveTimeBlock = (userId: UserId): ActiveTimeBlock => {
  return {
    userId,
    timeBlockId: createTimeBlockId(),
    startTime: Date.now(),
  };
};

export const createLoggedTimeBlock = (
  activeBlock: ActiveTimeBlock,
): LoggedTimeBlock => {
  return {
    ...activeBlock,
    endTime: Date.now(),
  };
};
