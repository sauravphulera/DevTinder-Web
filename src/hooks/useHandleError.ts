import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useHandleError = () => {
  const navigate = useNavigate();

  return (error: AxiosError) => {
    if (error.response?.status === 401) {
      navigate("/login");
    }
  };
};
