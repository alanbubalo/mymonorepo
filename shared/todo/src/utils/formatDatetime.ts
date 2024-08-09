import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

/**
 * Formats a datetime string using the "llll" format
 *
 * @example
 * formatDatetime("2024-08-02T14:11:39+02:00") // returns "Fri, Aug 2, 2024 2:11 PM"
 *
 * @param datetime - The datetime string to format
 * @returns The formatted date string
 */
export const formatDatetime = (datetime: string) => {
  return dayjs(datetime).format("llll");
};
