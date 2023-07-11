import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineDocumentText } from "react-icons/hi";

export const Footer = () => {
  return (
    <>
      <footer className="    drop-shadow-xl bg-darkPrimary  z-10 text-white mx-auto">
        <section className="flex items-center flex-col justify-center">
          <p className="text-3xl font-bold  m-8">not Fab Glass and Mirror</p>
          <p>Yo, we got the backend vibes rollin' at Cyclic!</p>
          <div className="flex p-10">
            <Link
              className="flex items-center text-2xl"
              to="https://github.com/AkaAbdullah/plexi2.0"
              title="Project Link"
            >
              <FaGithub className="w-24 h-12" />
            </Link>
            <Link
              className="flex items-center text-2xl"
              to="https://github.com/AkaAbdullah/plexi2.0"
              title="Documentation"
            >
              <HiOutlineDocumentText className="w-24 h-12" />
            </Link>
          </div>
        </section>
      </footer>
    </>
  );
};
