import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { useHandleError } from "../../hooks/useHandleError";
import axios, { AxiosError } from "axios";
import { API_URLS, BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../shared/toast/ToastContext";

const EditProfile = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState<
    Pick<
      User,
      | "age"
      | "gender"
      | "skills"
      | "photoUrl"
      | "firstName"
      | "lastName"
      | "email"
    >
  >({
    age: user?.age || 0,
    gender: user?.gender || "",
    skills: user?.skills || [],
    photoUrl: user?.photoUrl || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [error, setError] = useState("");
  const handleError = useHandleError();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        age: user.age || 0,
        gender: user.gender || "",
        skills: user.skills || [],
        photoUrl: user.photoUrl || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      skills: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 🛠 API logic goes here
    setError("");
    try {
      const { firstName, lastName, email, ...payload } = formData;
      const res = await axios.patch(
        BASE_URL + API_URLS.editProfile,
        { ...payload },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      showToast("Profile updated successfully!", "success", 2000);
    } catch (e) {
      const error = e as AxiosError;
      handleError(error);
      const data = error?.response?.data as { msg?: string };
      const msg = data?.msg || "some error occurred";
      setError(msg);
    }
    console.log("Updated profile:", formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-base-300 shadow-xl rounded-xl p-6 my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={formData?.photoUrl || "/fallback-avatar.png"}
              alt="Profile"
            />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold">
          {formData?.firstName} {formData?.lastName}
        </h3>
        <p className="text-gray-500">{formData?.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Age */}
          <fieldset className="fieldset flex-1">
            <legend className="fieldset-legend">Age</legend>
            <input
              name="age"
              type="number"
              value={formData?.age || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter age"
            />
          </fieldset>

          {/* Gender */}
          <fieldset className="fieldset flex-1">
            <legend className="fieldset-legend">Gender</legend>
            <select
              name="gender"
              value={formData?.gender || ""}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </fieldset>
        </div>
        {/* Skills */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>
          <input
            name="skills"
            value={formData?.skills?.join(", ") || ""}
            onChange={handleSkillsChange}
            className="input input-bordered w-full"
            placeholder="e.g. React, Node.js, TypeScript"
          />
          <p className="label">Comma separated</p>
        </fieldset>

        {/* Photo URL */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Photo URL</legend>
          <input
            name="photoUrl"
            value={formData?.photoUrl || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
          />
        </fieldset>
        {error && <p className="text-red-400">{error}</p>}

        {/* Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
