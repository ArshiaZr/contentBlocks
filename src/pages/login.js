import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";

import { Button, Input, AuthLayout } from "../components";

import {
  usernameAtom,
  passwordAtom,
  errorMessageAtom,
  loadingAtom,
} from "../utils/atoms";

import { useLogin } from "../custom_hooks";

export default function Login() {
  // States
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [_, setLoading] = useAtom(loadingAtom);

  // Custom hook for login functionality
  const { handleLogin } = useLogin();

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Login";
    setUsername("");
    setPassword("");
    setErrorMessage({});
    setLoading(false);
  }, []);

  // handle input change
  const onInputChange = ({ target: { name, value } }) => {
    const setters = {
      username: setUsername,
      password: setPassword,
    };
    setters[name](value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call the registerUser from custom hook
    await handleLogin();
  };

  return (
    <AuthLayout title={"Welcome Back!"}>
      {errorMessage.general?.length > 0 ? (
        <div className="text-md font-medium text-purple-600 mb-2 italic">
          *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <Input
          title="Username:"
          type="text"
          name="username"
          placeholder="Username..."
          error={errorMessage.username}
          onChange={onInputChange}
        />
        <Input
          title="Password:"
          type="password"
          name="password"
          placeholder="********"
          error={errorMessage.password}
          onChange={onInputChange}
        />
        <div>
          <Button type="submit" title={"Login"} />
          <div className="text-md px-12 text-center mt-4 font-medium">
            <Link
              to="/forgot-password"
              className="font-bold text-indigo-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="px-12 text-center mt-1 font-medium text-sm">
            <Link
              to="/deprecated-login"
              className="font-bold hover:underline text-slate-400"
            >
              Use magic link to login
            </Link>
          </div>
          <div
            className="flex items-center justify-center border-t-2 border-gray-500 mt-12"
            style={{ borderColor: "#DEE7ED" }}
          >
            <h2 className="bg-white py-3 px-6 -mt-6 font-bold text-gray-400">
              OR
            </h2>
          </div>
          <div className="mt-4">
            <div className="text-xl text-center font-bold mb-4">
              Get Started with ContentBlocks
            </div>
            <Link to="/signup">
              <Button type="button" title={"Create Your Account"} />
            </Link>
            <div className="text-md text-center mt-4 text-gray-600">
              Your first workspace is free!
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
