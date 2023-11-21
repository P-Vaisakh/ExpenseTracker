import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <div className="container px-10 flex flex-col md:flex-row w-screen h-screen justify-center items-center  mx-auto">
      {isLoading ? (
        <div className="h-8 w-8 bg-transparent border-dotted rounded-full border-8 animate-spin transition-all duration-1000 border-indigo-600"></div>
      ) : (
        <div className="mx-auto flex flex-col justify-center items-center md:items-start">
          <h1 className="md:text-6xl font-bold md:leading-1 my-5  text-2xl text-center md:text-start ">
            Gain total control of <br /> your Money.
          </h1>
          <p className="text-gray-500 md:text-xl text-sm  md:leading-10 text-center md:text-start">
            Become your own money manager and make every cent count.
          </p>
          <div className="flex gap-4 mt-3  justify-center md:justify-start">
            <Link to="/register">
              <button className="bg-indigo-600 text-white px-4 py-1.5 hover:bg-indigo-500 rounded-md">
                Signup
              </button>
            </Link>

            <Link to="/auth">
              <button className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border-gray-300 px-3 py-1.5 rounded-md transition-all duration-300 border">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 hidden md:flex">
        <img src="/cover.png" alt="" className="w-[400px]" />
      </div>
    </div>
  );
};

export default Landing;
