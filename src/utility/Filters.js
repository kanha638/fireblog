import { BlogsUpdater } from "../features/userSlice";

export const sortByLikeCount = (arr) => {
  console.log(arr);
  const value = arr.slice().sort((a, b) => {
    return a.likeCount > b.likeCount ? -1 : a.likeCount < b.likeCount ? 1 : 0;
  });
  console.log(value);
  BlogsUpdater(value);
  return value;
};
export const sortByTimeStamp = (arr) => {
  const value = arr.slice().sort((a, b) => {
    return a.timeStamp.seconds < b.timeStamp.seconds
      ? -1
      : a.timeStamp.seconds > b.timeStamp.seconds
      ? 1
      : 0;
  });
  BlogsUpdater(value);
  return value;
};
