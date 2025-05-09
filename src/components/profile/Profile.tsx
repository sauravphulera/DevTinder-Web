import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { AppRootState } from "../../store/appStore";

const Profile = () => {
  const user = useSelector((state: AppRootState) => state.user);
  return (
    // <div>
    <EditProfile user={{ ...user }} />
  );
};

export default Profile;
