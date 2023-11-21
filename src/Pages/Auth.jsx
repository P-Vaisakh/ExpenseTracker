import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ register }) {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
       await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: uname });
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let { displayName, id } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        {/* <!-- Login Section --> */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">
              {register ? "Signup" : "Login"}
            </p>
            <form className="flex flex-col pt-3 md:pt-8">
              {register && (
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="text-lg">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Username..."
                    onChange={(e) => setUname(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  type="password"
                  required
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {register ? (
                <input
                  onClick={(e) => handleSignup(e)}
                  type="submit"
                  value="Signup"
                  className="bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 p-2 mt-8"
                />
              ) : (
                <input
                  onClick={(e) => handleLogin(e)}
                  type="submit"
                  value="Log In"
                  className="bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 p-2 mt-8"
                />
              )}
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                {register
                  ? "Already have an account?"
                  : "Don't have an account?"}
                {register ? (
                  <Link to="/auth" className="underline font-semibold">
                    Login
                  </Link>
                ) : (
                  <Link to="/register" className="underline font-semibold">
                    Register here.
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="check"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
