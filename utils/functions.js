import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const convertTimeAndDate = (created_at) => {
  dayjs.extend(relativeTime);
  return dayjs(created_at).fromNow();
};