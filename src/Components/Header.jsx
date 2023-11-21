import React, { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { updateLogoutState } from "../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { filterItem } from "../Redux/itemsSlice";

export default function NavMegaMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  // function foe handling signout
  const handleSignout = () => {
    signOut(auth);
    dispatch(updateLogoutState());
    navigate("/auth");
  };

  return (
    <div className="relative bg-white scroll-smooth">
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
          <section className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <h2 className="text-indigo-600 font-bold md:text-4xl text-2xl">
                Finbud
              </h2>
            </a>
          </section>

          <section className="-mr-2 -my-2 md:hidden">
            <button
              onClick={() => setMenu((prev) => !prev)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open menu</span>

              <HiOutlineMenu className="h-6 w-6 text-indigo-600" />
            </button>
          </section>

          <nav className="hidden md:flex space-x-10">
            <div className="relative">
              <Link
                to="/"
                className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 "
              >
                <span>Home</span>
              </Link>
            </div>

            <a
              href="#transactions"
              className="text-base font-medium text-gray-500 hover:text-gray-900 -scroll-my-20"
            >
              Transactions
            </a>

            <div className="relative max-w-5xl">
              <select
                onChange={(e) => dispatch(filterItem(e.target.value))}
                className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                <option value="all" defaultValue={"Categories"}>
                  {" "}
                  All Categories
                </option>
                <option value="home">Home</option>
                <option value="groceries">Groceries</option>
                <option value="travel">Travel</option>
                <option value="eatout">Eat out</option>
                <option value="shopping">Shopping</option>
                <option value="entertainment">Entertainment</option>
                <option value="others">Others</option>
              </select>
            </div>
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={handleSignout}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Signout
            </button>
          </div>
        </div>
      </section>
      <section
        className={`${
          menu ? "absolute" : "hidden"
        } top-0 inset-x-0 inset-y-0 p-2 transition transform origin-top-right md:hidden`}
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <section className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <a href="/">
                <h2 className="text-indigo-600 font-bold md:text-4xl text-2xl">
                  Finbud
                </h2>
              </a>

              <div className="-mr-2">
                <button
                  onClick={() => setMenu((prev) => !menu)}
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>

                  <HiX className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <nav className="grid gap-y-8">
                <Link
                  to="/"
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  <span className="ml-3 text-base font-medium text-gray-900">
                    Home
                  </span>
                </Link>

                <a
                  href="#transactions"
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  <span className="ml-3 text-base font-medium text-gray-900">
                    Transactions
                  </span>
                </a>

                <select
                  onChange={(e) => dispatch(filterItem(e.target.value))}
                  className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32"
                >
                  <option value="all" defaultValue={"Categories"}>
                    {" "}
                    All Categories
                  </option>
                  <option value="home">Home</option>
                  <option value="groceries">Groceries</option>
                  <option value="travel">Travel</option>
                  <option value="eatout">Eat out</option>
                  <option value="shopping">Shopping</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="others">Others</option>
                </select>
              </nav>
            </div>
          </section>

          <div className="pb-4 px-4">
            <a
              onClick={handleSignout}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Signout
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
