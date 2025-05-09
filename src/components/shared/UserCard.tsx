import type { FC } from "react";
import { User } from "../../types/user";
import axios, { AxiosError } from "axios";
import { API_URLS, BASE_URL } from "../../utils/constants";
import { useHandleError } from "../../hooks/useHandleError";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../store/feedSlice";

const userCard: FC<User> = (user: User) => {
  const handleError = useHandleError();
  const dispatch = useDispatch();

  const handleSendReq = async (status: string, id: string) => {
    try {
      const url = API_URLS.sendConnection.replace("{status}", status);
      const res = await axios.post(
        BASE_URL + url + id,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(removeFeed(id));
      }
    } catch (e) {
      handleError(e as AxiosError);
    }
  };
  return (
    <div>
      <div
        key={user._id}
        className="card bg-base-300 shadow-lg p-4 w-80 h-auto flex flex-col"
      >
        {/* User Avatar */}
        <div className="avatar mx-auto mb-4">
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt={`${user.firstName}'s avatar`}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-lg font-bold text-base-content">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-base-content/70">{user.email}</p>
          <p className="mt-2 text-base-content">
            <span className="font-medium">Age:</span> {user.age}
          </p>
          <p className="text-sm text-base-content/70 mt-1">
            Joined:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex mt-4 gap-4 justify-center">
          <button
            className="btn btn-primary w-1/2"
            onClick={() => handleSendReq("interested", user._id)}
          >
            Interested
          </button>
          <button
            className="btn btn-secondary w-1/2"
            onClick={() => handleSendReq("ignored", user._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default userCard;
