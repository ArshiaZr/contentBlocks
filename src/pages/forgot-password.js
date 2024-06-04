import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import buttonStyles from "../styles/ui/button.module.scss";

import { Input, AuthLayout } from "../components";

import {
  errorMessageAtom,
  passwordResetPendingAtom,
  emailAtom,
} from "../utils/atoms";

import { useForgotPassword } from "../custom_hooks";

export default function ForgotPassword() {
  // States
  const [email, setEmail] = useAtom(emailAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [passwordPending, setPasswordPending] = useAtom(
    passwordResetPendingAtom
  );
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");

  const { requestPasswordReset, verifyResetCode } = useForgotPassword();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setNewPassword(value);
        break;
      case "code":
        setCode(value);
        break;
      default:
        break;
    }
  };

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Forgot Password";
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    // request password reset
    await requestPasswordReset();
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    // verify reset code and set new password
    await verifyResetCode(code, newPassword);
  };

  if (passwordPending) {
    return (
      <AuthLayout title={"Reset Your Password"}>
        {errorMessage.general?.length > 0 ? (
          <div className="text-md font-medium text-purple-600 mb-2 italic">
            *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={handleResetSubmit}>
          <Input
            title="Code:"
            type="text"
            name="code"
            placeholder="Code..."
            error=""
            onChange={onInputChange}
          />
          <Input
            title="New Password:"
            type="password"
            name="password"
            placeholder="New Password..."
            error={errorMessage.password}
            onChange={onInputChange}
          />
          <div>
            <button
              type="submit"
              className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
            >
              Submit
            </button>
          </div>
          <div className="text-md px-12 text-center mt-4 font-medium">
            <Link
              to="/login"
              className="font-bold text-indigo-500 hover:underline"
            >
              Remembered your password? Login here.
            </Link>
          </div>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={"Recover Your Account"}>
      {errorMessage.general?.length > 0 ? (
        <div className="text-md font-medium text-purple-600 mb-2 italic">
          *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleRequestSubmit}>
        <Input
          title="Email:"
          type="email"
          name="email"
          placeholder="Email..."
          error={errorMessage.email}
          onChange={onInputChange}
        />
        <div>
          <button
            type="submit"
            className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
          >
            Submit
          </button>
        </div>
        <div className="text-md px-12 text-center mt-4 font-medium">
          <Link
            to="/login"
            className="font-bold text-indigo-500 hover:underline"
          >
            Remembered your password? Login here.
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
