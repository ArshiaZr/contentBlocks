import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Button, Input, AuthLayout } from "../components";

import {
  emailAtom,
  passwordAtom,
  errorMessageAtom,
  confirmPasswordAtom,
  usernameAtom,
  loadingAtom,
  verifyPendingAtom,
} from "../utils/atoms";

import { useRegister } from "../custom_hooks";

export default function SignUp() {
  // States
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [_, setLoading] = useAtom(loadingAtom);
  const [verifyPending, setVerifyPending] = useAtom(verifyPendingAtom);

  const [code, setCode] = useState("");

  // Custom hook for registration functionality.
  const { registerUser, verifyEmail } = useRegister();

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Sign Up";
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage({});
    setLoading(false);
  }, []);

  // handle input change
  const onInputChange = ({ target: { name, value } }) => {
    const setters = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };
    setters[name](value);
  };

  // handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    // call the registerUser from custom hook
    await registerUser();
  };

  // handle verify email form submission
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    // call the verifyEmail from custom hook
    await verifyEmail(code);
  };

  if (verifyPending)
    return (
      <AuthLayout title="Verify Email">
        {errorMessage.general?.length > 0 ? (
          <div className="text-md font-medium text-purple-600 mb-2 italic">
            *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={handleVerifyEmail}>
          <Input
            title="Verification Code:"
            type="text"
            placeholder="Code..."
            name="code"
            error={errorMessage.code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <div>
            <Button type="submit" title={"Submit"} />
          </div>
        </form>
      </AuthLayout>
    );

  return (
    <AuthLayout title="Sign Up">
      {errorMessage.general?.length > 0 ? (
        <div className="text-md font-medium text-purple-600 mb-2 italic">
          *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleRegister}>
        <Input
          title="Username:"
          type="text"
          placeholder="Username..."
          name="username"
          error={errorMessage.username}
          onChange={onInputChange}
        />
        <Input
          title="Email Address:"
          type="email"
          placeholder="Email..."
          name="email"
          error={errorMessage.email}
          onChange={onInputChange}
        />
        <Input
          title="Password:"
          type="password"
          placeholder="********"
          name="password"
          error={errorMessage.password}
          onChange={onInputChange}
        />
        <Input
          title="Confirm Password:"
          type="password"
          placeholder="********"
          name="confirmPassword"
          error={errorMessage.confirmPassword}
          onChange={onInputChange}
        />
        <div>
          <Button type="submit" title={"Sign Up"} />
        </div>
        <div className="text-md px-12 text-center mt-4 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="inline-block mr-2 iconify iconify--ph"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <g fill="currentColor">
              <path
                d="M200 128a72 72 0 1 1-72-72a72 72 0 0 1 72 72"
                opacity=".2"
              ></path>
              <path d="M214.86 180.12a8 8 0 0 1-11 2.74L136 142.13V216a8 8 0 0 1-16 0v-73.87l-67.88 40.73a8 8 0 1 1-8.23-13.72L112.45 128L43.89 86.86a8 8 0 1 1 8.23-13.72L120 113.87V40a8 8 0 0 1 16 0v73.87l67.88-40.73a8 8 0 1 1 8.23 13.72L143.55 128l68.56 41.14a8 8 0 0 1 2.75 10.98"></path>
            </g>
          </svg>
          Create Mini Courses, Bridges Pages &amp; much more.&nbsp;
          <Link
            to="/login"
            className="font-bold text-indigo-500 hover:underline"
          >
            Already a member? Login here.
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
