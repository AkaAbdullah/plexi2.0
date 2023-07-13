import { useEffect, useState } from "react";
import { createUser, reset2, getAllUsers } from "../redux/users/authSlice";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../components/Spinner";

export const AdminPage = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    createdUser,
    message,
    isError,
    isSuccess,
    allUsers,
  } = useSelector((state) => state.auth);

  //view users div
  const [userDiv, setUserDiv] = useState(false);
  const handleUserView = () => {
    setViewForm(false);
    setUserDiv(!userDiv);
    console.log(allUsers);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to Create User");
    }
    if (isSuccess) {
      toast.success("User created Successfully");
      console.log(createdUser);
    }
    dispatch(reset2());
  }, [error, createdUser, isLoading, message, isError, dispatch, isSuccess]);

  const [viewForm, setViewForm] = useState(false);
  const handleViewForm = () => {
    setViewForm(!viewForm);
    setUserDiv(false);
  };

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(data));
    setData({
      userName: "",
      email: "",
      password: "",
      roles: "",
    });
  };

  const styles = {
    height: "50",
    width: "50",
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="container  mx-auto lg:h-[150vh] sm-h-fit  max-w-6xl p-4  z-10 ">
        <div className="flex gap-10 justify-evenly">
          <button
            onClick={handleViewForm}
            className=" hover:bg-blue-500 w-72 h-24  rounded-full flex items-center justify-center text-white bg-blue-700 "
          >
            <p className="text-2xl">Create New User</p>
          </button>

          <button
            onClick={handleUserView}
            className=" hover:bg-blue-500 w-72 h-24  rounded-full flex items-center justify-center text-white bg-blue-700 "
          >
            <p className="text-2xl">View All Users</p>
          </button>
        </div>
        <div
          className={`${!viewForm ? "hidden" : "border p-4 mt-8 rounded-2xl"} ${
            darkMode ? "" : "border-black"
          } `}
        >
          <form
            onSubmit={handleSubmit}
            className={`flex gap-5 font-semibold ${
              darkMode ? "text-white" : "text-black "
            } text-2xl m-8 flex-col  `}
          >
            <label>User Name</label>
            <input
              className={`h-9  p-4 bg-transparent border ${
                darkMode ? "" : "border-black"
              } `}
              placeholder="Enter User Name "
              autoFocus
              name="userName"
              value={data.userName}
              onChange={handleInputChange}
            />
            <label>Email</label>
            <input
              className={`h-9  p-4 bg-transparent border ${
                darkMode ? "" : "border-black"
              } `}
              placeholder="Enter User Email Address "
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
            <label> Password</label>
            <input
              className={`h-9  p-4 bg-transparent border ${
                darkMode ? "" : "border-black"
              } `}
              placeholder="Enter PassWord "
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
            />
            <label>Role</label>
            <select
              className={`h-9  p-4 bg-transparent border ${
                darkMode ? "" : "border-black"
              } `}
              type="select"
              name="roles"
              value={data.roles}
              onChange={handleInputChange}
            >
              <option className="text-white  bg-darkPrimary" value="user">
                User
              </option>
              <option className="text-white bg-darkPrimary" value="admin">
                Admin
              </option>
              <option className="text-white bg-darkPrimary" value="SuperUser">
                Super User
              </option>
            </select>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 h-16 mt-10"
            >
              Create User
            </button>

            {isLoading && <Spinner styles={styles} />}
            {isError && <p className="text-center">{error}</p>}
          </form>
        </div>
        {userDiv && (
          <>
            <div
              className={` border  p-4 mt-8 ${
                darkMode ? "" : "border-black"
              } rounded-2xl `}
            >
              <p
                className={` ${
                  darkMode ? "text-white" : "text-black"
                } text-3xl text-center  underline `}
              >
                Users Details
              </p>
              <div className={`${darkMode ? "text-white" : "text-black"}`}>
                <p className="text-2xl text-right">
                  Active Users : {allUsers.length}
                </p>
                {allUsers.map((user) => (
                  <p className="text-3xl m-5 " key={user._id}>
                    {user.userName} <br /> {user.email} <br /> {user._id} <br />
                    Roles : {user.roles}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
