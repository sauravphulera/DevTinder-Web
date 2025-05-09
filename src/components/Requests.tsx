import { useEffect, useState, type FC } from "react";
import axios, { AxiosError } from "axios";
import { API_URLS, BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useHandleError } from "../hooks/useHandleError";
import { AppRootState } from "../store/appStore";
import Loader from "./shared/Loader";
import { addRequest, removeRequest } from "../store/requestSlice";
import ConnectionListItem from "./shared/connectionListItem";
import { Connection } from "../types/connection";

const Requests: FC = () => {
  const dispatch = useDispatch();
  const handleError = useHandleError();
  const requests = useSelector((store: AppRootState) => store.request) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + API_URLS.requests, {
        withCredentials: true,
      });
      const users = res?.data?.requests || [];
      dispatch(addRequest(users));
    } catch (e) {
      handleError(e as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status: string, id: string) => {
    try {
      const url = API_URLS.review.replace("{status}", status);
      await axios.post(
        BASE_URL + url + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (e) {
      handleError(e as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      {requests.length === 0 && (
        <div className="text-center text-xl font-bold mt-6  text-primary">
          No Connection request found!
        </div>
      )}

      {requests.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">
            Connection Requests
          </h2>
          <ul className="space-y-4">
            {requests.map((user: Connection) => (
              <ConnectionListItem
                key={user._id}
                user={user}
                showActions={true}
                onAccept={(id) => reviewRequest("accepted", id)}
                onReject={(id) => reviewRequest("rejected", id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Requests;
