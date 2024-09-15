export type UserId = string;

export const createUserId = () => crypto.randomUUID();
