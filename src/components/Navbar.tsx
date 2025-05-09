import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../store/appStore";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { API_URLS, BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

function Navbar() {
  const user = useSelector((state: AppRootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await axios.post(
        BASE_URL + API_URLS.logout,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  }

  return (
    <>
      <div className="navbar bg-neutral shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🧑‍💻 Dev Tinder{" "}
          </Link>
        </div>
        <div className="flex gap-2 mx-3">
          <div>welcome {user?.firstName}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoUrl || null}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="bg-base-300 menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between"
                  onClick={() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="justify-between"
                  onClick={() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="justify-between"
                  onClick={() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
