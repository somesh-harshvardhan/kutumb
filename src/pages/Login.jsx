import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../utils/api";
import { toast } from "react-toastify";
import { getUserAccessToken, setUserAccessToken } from "../utils/cookie";
import { routes } from "../utils/routes";
import OTPInput from "react-otp-input";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await loginApiCall(username, otp);
      setUserAccessToken(token);
      navigate(routes.quote);
      toast.success("Login Success full");
    } catch (error) {
      toast.error("Login failed");
      setError(true);
    }
  };
  useEffect(() => {
    const token = getUserAccessToken();
    if (token) navigate(routes.quote);
  }, []);

  const isDisabled = !username.length || !otp.length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Please Login to Continue!
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Enter Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setError(false);
              setUsername(e.target.value);
            }}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-600"
          >
            Enter OTP
          </label>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={
              <span className=" flex-1 text-center text-lg">-</span>
            }
            renderInput={(props) => <input {...props} />}
            containerStyle={
              "mt-1 w-full py-2  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex justify-between gap-x-4"
            }
            inputStyle={"px-2 py-2 flex-1 border border-gray-300 rounded "}
          />
        </div>
        {error && (
          <div className=" text-red-500 my-3 text-sm">
            User name or password entered is wrong!
          </div>
        )}
        <button
          onClick={handleLogin}
          disabled={isDisabled}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg
        ${
          isDisabled
            ? " bg-blue-300 cursor-not-allowed"
            : " bg-blue-400 hover:bg-blue-500"
        }
    `}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
