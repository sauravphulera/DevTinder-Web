import { useEffect, type FC } from "react";
import { API_URLS, BASE_URL } from "../utils/constants";
import axios, { AxiosError } from "axios";
import { useHandleError } from "../hooks/useHandleError";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { AppRootState } from "../store/appStore";
import UserCard from "./shared/UserCard";

const Feed: FC = () => {
  const dispatch = useDispatch();
  const handleError = useHandleError();
  const feed = useSelector((store: AppRootState) => store.feed) || [];
  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const res = await axios.get(BASE_URL + API_URLS.feed, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.displayUsers));
    } catch (e) {
      handleError(e as AxiosError);
    }
  };

  if (feed.length <= 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div>No Users Found!</div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide flex flex-wrap gap-4 p-4 justify-center">
        <UserCard {...feed[0]} />
      </div>
    </>
  );
};

export default Feed;
