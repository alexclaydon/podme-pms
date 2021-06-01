import dayjs from "dayjs";

export const formatJoinTime = timestamp => {
  return dayjs(timestamp).format("h:mmA");
};

export const uuid = () => {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
