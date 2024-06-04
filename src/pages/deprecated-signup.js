import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";

import buttonStyles from "../styles/ui/button.module.scss";

import { Input, AuthLayout } from "../components";

import { emailAtom, errorMessageAtom } from "../utils/atoms";
import { validateEmail } from "../utils/validations";

export default function DeprecatedSignup() {
  // States
  const [email, setEmail] = useAtom(emailAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  // handle input change
  const onInputChange = ({ target: { name, value } }) => {
    const setters = {
      email: setEmail,
    };
    setters[name](value);
  };

  // handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage({});

    // initialize temporary errors object
    let errors = {};

    // validate form fields
    if (!email) errors.email = "Please fill in email field";
    if (!validateEmail(email)) errors.email = "Invalid email";

    // set the errors object to the errorMessage atom
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) return;

    // create a new user account with the magic link method
  };

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Sign Up";
    setEmail("");
    setErrorMessage({});
  }, []);

  return (
    <AuthLayout title={"Create Your Account"}>
      {errorMessage.general?.length > 0 ? (
        <div className="text-md font-medium text-purple-600 mb-2 italic">
          *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleRegister}>
        <Input
          title="Email Address:"
          type="email"
          placeholder="Email..."
          name="email"
          error={errorMessage.email}
          onChange={onInputChange}
        />
        <div>
          <button
            type="submit"
            className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
          >
            Sign Up
          </button>
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
            to="/deprecated-login"
            className="font-bold text-indigo-500 hover:underline"
          >
            Already a member? Login here.
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
