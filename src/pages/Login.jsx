import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoadingSpin } from "../components/Loading";

import { bgLogin } from "../assets";
import { Helmet } from "react-helmet-async";

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInGoogle, resetUserPassword } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPass = async () => {
    try {
      setLoading(true);
      await resetUserPassword(email);
      setLoading(false);
      alert("Please check your email");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.code);
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogInGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Login - M I C O G</title>
        <meta name="login page" content="login account" />
      </Helmet>
      <div className="w-full h-screen">
        <div className="mt-[-76px]">
          <img
            className=" absolute w-full h-full object-cover"
            src={bgLogin}
            alt="/"
          />
        </div>
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed top-6 w-full px-4 mt-24 z-50">
          <div className="max-w-[450px] h-auto mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Log In</h1>

              <div>
                {error === "auth/wrong-password" ? (
                  <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                    Vui lòng nhập đúng mật khẩu
                  </p>
                ) : error === "auth/user-not-found" ? (
                  <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                    Không tìm thấy người dùng
                  </p>
                ) : error === "auth/invalid-email" ? (
                  <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                    Email không hợp lệ
                  </p>
                ) : error === "auth/missing-password" ? (
                  <p className="mt-4 p-2 text-sm text-center text-slate-100 bg-red-600 rounded-md">
                    Thiếu mật khẩu
                  </p>
                ) : (
                  <></>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  required
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <input
                      className="mr-2"
                      type="checkbox"
                      onClick={(e) => setShowPassword(e.target.checked)}
                    />
                    <label>
                      {!showPassword ? "Show password" : "Hide password"}
                    </label>
                  </div>
                  <div
                    onClick={handleResetPass}
                    className="text-sm text-gray-600 hover:text-slate-300 cursor-pointer"
                  >
                    <p>Forgot password ?</p>
                  </div>
                </div>
                <button className="flex justify-center items-center text-black bg-red-600 py-3 my-6 rounded font-bold hover:text-slate-100">
                  Sign In
                  <LoadingSpin loading={loading} />
                </button>

                <p className="py-6">
                  <span className="text-gray-600">
                    Do you have an account yet ?
                  </span>{" "}
                  <NavLink
                    className="text-gray-300 hover:text-slate-50"
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </p>
                <div
                  onClick={handleLogInGoogle}
                  className="flex items-center cursor-pointer hover:text-green-100"
                >
                  <FontAwesomeIcon
                    className=" px-2 text-3xl "
                    icon={faGoogle}
                  />
                  <p className="mx-4">Đăng nhập với Google</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
