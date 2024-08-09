import dayjs from "dayjs";

/**
 * Returns the difference between two dates in seconds
 *
 * @example
 * datetimeDiff("2024-08-02T13:40:02+02:00", "2024-08-02T14:11:39+02:00") // returns 1897
 *
 * @param datetime1 - The first datetime string
 * @param datetime2 - The second datetime string
 * @returns The difference in seconds
 */
export const datetimeDiff = (datetime1: string, datetime2: string) => {
  return dayjs(datetime1).diff(dayjs(datetime2), "second");
};
