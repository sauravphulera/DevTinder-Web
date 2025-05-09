import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS, BASE_URL } from "../utils/constants";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("ankita@outlook.com");
  const [password, setPassword] = useState("ankita@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setError("");
    try {
      const url = `${BASE_URL}${
        mode === "login" ? API_URLS.login : API_URLS.signup
      }`;

      const payload =
        mode === "signup"
          ? { firstName, lastName, email, password }
          : { email, password };

      const res = await axios.post(url, payload, { withCredentials: true });

      if (res?.data?.user) {
        dispatch(addUser(res?.data?.user));
        navigate("/");
      }
    } catch (e) {
      const error = e as AxiosError;
      const data = error?.response?.data as { msg?: string };
      setError(data?.msg || "Some error occurred");
    }
  };

  const isFormValid =
    isValidEmail(email) &&
    password.trim() !== "" &&
    (mode === "login" || (firstName.trim() && lastName.trim()));

  return (
    <div className="flex justify-center items-center h-[99vh]">
      <div className="card bg-neutral w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center capitalize">
            {mode === "login" ? "Login" : "Signup"}
          </h2>

          <div>
            {mode === "signup" && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <p
                className={
                  email && !isValidEmail(email) ? "text-red-400" : "label"
                }
              >
                {email && !isValidEmail(email)
                  ? "Invalid email format"
                  : "Required"}
              </p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <p className="label">Required</p>
            </fieldset>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              {mode === "login" ? "Login" : "Signup"}
            </button>
          </div>
          <div className="text-center text-[12px]">
            {mode === "login" ? (
              <p>
                New User ?{" "}
                <Link to={"/signup"} className="font-bold text-primary">
                  Signup here
                </Link>
              </p>
            ) : (
              <p>
                Existing User ?{" "}
                <Link to={"/login"} className="font-bold text-primary">
                  login here
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
