export const TodoState = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type TTodoState = (typeof TodoState)[keyof typeof TodoState];
