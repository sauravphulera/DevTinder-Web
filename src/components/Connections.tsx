import { useEffect, useState, type FC } from "react";
import axios, { AxiosError } from "axios";
import { API_URLS, BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionSlice";
import { useHandleError } from "../hooks/useHandleError";
import { AppRootState } from "../store/appStore";
import Loader from "./shared/Loader";
import ConnectionListItem from "./shared/connectionListItem";
import { Connection } from "../types/connection";

const Connections: FC = () => {
  const dispatch = useDispatch();
  const handleError = useHandleError();
  const connections =
    useSelector((store: AppRootState) => store.connection) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + API_URLS.connections, {
        withCredentials: true,
      });
      const users = res?.data?.connections || [];
      dispatch(addConnection(users));
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
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Connections
      </h2>

      <ul className="space-y-4">
        {connections.map((user: Connection) => (
          <ConnectionListItem key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Connections;
