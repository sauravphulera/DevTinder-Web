// components/AuthWrapper.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import axios from "axios";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import Body from "./Body";
import Profile from "./profile/Profile";
import { BASE_URL, API_URLS } from "../utils/constants";
import { AppRootState } from "../store/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import AuthForm from "./AuthForm";

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store: AppRootState) => store.user);

  useEffect(() => {
    const isAuthRoute =
      location.pathname === "/login" || location.pathname === "/signup";
    if (!user && !isAuthRoute) {
      fetchUser();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}${API_URLS.profile}`, {
        withCredentials: true,
      });
      if (user?.data) {
        // navigate("/");
        dispatch(addUser(user.data));
      } else {
        navigate("/login");
      }
    } catch (e: unknown) {
      navigate("/login");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route index element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
    </Routes>
  );
};

export default AuthWrapper;
