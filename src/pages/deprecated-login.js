import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import buttonStyles from "../styles/ui/button.module.scss";

import { AuthLayout, Input } from "../components";

import { emailAtom, errorMessageAtom } from "../utils/atoms";
import { validateEmail } from "../utils/validations";

export default function DeprecatedLogin() {
  // States
  const [email, setEmail] = useAtom(emailAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Login";
    setEmail("");
    setErrorMessage({});
  }, []);

  // handle input change
  const onInputChange = ({ target: { name, value } }) => {
    const setters = {
      email: setEmail,
    };
    setters[name](value);
  };

  // handle login form submission
  const handleLogin = async (e) => {
    // initialize temporary errors object
    let errors = {};
    e.preventDefault();
    if (!email) errors.email = "Please fill in email field";
    if (!validateEmail(email)) errors.email = "Invalid email";

    // set errors to error message atom
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    // magic link sign in logic
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

      <form onSubmit={handleLogin}>
        <Input
          title="Email Address:"
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
            Login
          </button>
          <div className="px-12 text-center mt-4 font-medium text-sm">
            <Link
              to="/login"
              className="font-bold hover:underline text-slate-400"
            >
              Use new login
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
            <Link to="/deprecated-signup">
              <button
                type="button"
                className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
              >
                Create Your Account
              </button>
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
