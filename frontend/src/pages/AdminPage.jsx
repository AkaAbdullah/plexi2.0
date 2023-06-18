import { useState } from "react";

export const AdminPage = () => {
  const [viewForm, setViewForm] = useState(false);
  const handleViewForm = () => {
    setViewForm(!viewForm);
    console.log(viewForm);
  };
  return (
    <>
      <section className="container  mx-auto h-screen max-w-6xl p-4  z-10 m-8">
        <div className="flex gap-10 justify-evenly">
          <button
            onClick={handleViewForm}
            className=" hover:bg-orange-600 w-72 h-24  rounded-full flex items-center justify-center text-white bg-orange-700 "
          >
            <p className="text-2xl">Create New User</p>
          </button>

          <button className=" hover:bg-orange-600 w-72 h-24  rounded-full flex items-center justify-center text-white bg-orange-700 ">
            <p className="text-2xl">View All Users</p>
          </button>
        </div>
        <div className={!viewForm ? "hidden" : "border p-4 mt-8  "}>
          <form className="flex gap-5 text-white text-2xl m-8 flex-col ">
            <label>User Name</label>
            <input
              className="h-9  p-4 bg-darkSecondary"
              placeholder="Enter User Name "
              autoFocus
            />
            <label>Email</label>
            <input
              className="h-9  p-4  bg-darkSecondary "
              placeholder="Enter User Email Address "
            />
            <label> Password</label>
            <input
              className="h-9  p-4  bg-darkSecondary"
              placeholder="Enter PassWord "
              type="password"
            />
            <label>Role</label>
            <select
              className="h-9  p-4  text-white bg-darkSecondary"
              placeholder="Enter PassWord "
              type="select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="SuperUser">Super User</option>
            </select>
            <button
              type="submit"
              className="bg-orange-700 hover:bg-orange-600 h-16 mt-10"
            >
              Create User
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
