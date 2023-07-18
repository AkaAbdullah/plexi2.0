import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../redux/users/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const [password, setPassword] = useState("");
  const data = {
    password: password,
    id: user._id,
  };
  const updateUserPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword(data));
    toast.success("Password Updated Successfully");
    setPassword("");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section
        className={`mx-auto flex h-screen ${
          darkMode ? "text-white" : "text-black"
        } flex-col container items-center gap-10 py-4 z-10 max-w-6xl `}
      >
        <p className="text-3xl font-bold text-center  ">User Dashboard</p>
        <div
          className={`border p-14 ${
            darkMode ? "border-white" : "border-black"
          }  rounded-2xl lg:w-2/3 sm:w-fit flex flex-col gap-8`}
        >
          <p className="lg:text-2xl sm:text-xl font-semibold underline ">
            UserID : {user._id}
          </p>
          <p className="lg:text-2xl sm:text-xl font-semibold  ">
            Email : {user.email}
          </p>
          <p className="lg:text-2xl sm:text-xl font-semibold">
            UserName : {user.userName}
          </p>
          <p className="lg:text-2xl sm:text-xl font-semibold">
            Roles : {user.roles}
          </p>
          <label className="text-2xl">Update Password ⤵</label>
          <input
            type="password"
            required
            value={password}
            autoFocus
            name="password"
            placeholder="enter new password"
            className={`h-10 mt-5 bg-transparent focus:bg-transparent    border rounded-md text-2xl ${
              darkMode
                ? "border-white"
                : "border-black text-black focus:text-black"
            } `}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={updateUserPassword}
            className="bg-blue-600 h-12 text-2xl hover:bg-blue-800    "
          >
            Update Password
          </button>
        </div>
      </section>
    </>
  );
};
