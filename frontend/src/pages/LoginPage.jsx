export const LoginPage = () => {
  return (
    <>
      <section className=" text-white mx-auto h-screen max-w-6xl  container flex flex-col justify-center items-center drop-shadow-xl  ">
        <div className="dark:bg-darkSecondary mt-[-150px] bg-lightSecondary w-96 text-white flex flex-col items-center gap-10">
          <p className="text-6xl mt-11">Login</p>
          <form className="flex flex-col gap-5">
            <label className="text-xl">UserName</label>
            <input
              className=" bg-darkPrimary h-9 border-solid rounded-sm"
              type="text"
              placeholder="User Name"
              autoFocus
            />
            <label className="text-xl">Password</label>
            <input
              className=" bg-darkPrimary h-9 border-0   rounded-sm"
              type="password"
              placeholder="Password"
            />
            <button className=" mb-11 bg-lightSecondary h-9 text-xl  hover:bg-stone-500">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
