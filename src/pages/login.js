import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import buttonStyles from "../styles/ui/button.module.scss";
import { useSignIn, useClerk } from "@clerk/clerk-react";

import Input from "../components/Input";

import { usernameAtom, passwordAtom, errorMessageAtom } from "../utils/atoms";

export default function Login() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const navigate = useNavigate();

  const { signIn } = useSignIn();
  const { setActive } = useClerk();

  const onInputChange = ({ target: { name, value } }) => {
    const setters = {
      username: setUsername,
      password: setPassword,
    };
    setters[name](value);
  };

  const handleLogin = async (e) => {
    // initialize temporary errors object
    let errors = {};
    e.preventDefault();
    if (!username) errors.username = "Please fill in email field";
    if (!password) errors.password = "Please fill in password field";

    // set errors to error message atom
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    // try to sign in
    try {
      const signInResponse = await signIn.create({
        identifier: username,
        password,
      });

      // if sign in is successful set session and redirect to dashboard if not show error message
      if (signInResponse.status === "complete") {
        await setActive({ session: signInResponse.createdSessionId });
        setUsername("");
        setPassword("");
        setErrorMessage({});
        navigate("/");
      } else {
        setErrorMessage({ general: "Invalid username or password" });
      }
    } catch (error) {
      setErrorMessage({ general: "Invalid username or password" });
    }
  };

  return (
    <main className="p-12 bg-purple-600 min-h-screen flex justify-center items-center flex-col background">
      <div className="max-w-lg mx-auto p-8 text-center title-class">
        <div className="font-bold text-4xl text-white">Welcome Back!</div>
      </div>
      <div className="form-wrapper-width mx-auto bg-white border-[2px] border-black p-8 rounded-md">
        <div>
          {errorMessage.general?.length > 0 ? (
            <div className="text-md font-medium text-purple-600 mb-2 italic">
              *{errorMessage.general?.length > 0 ? errorMessage.general : ""}
            </div>
          ) : (
            ""
          )}

          <form onSubmit={handleLogin}>
            <Input
              title="Username:"
              type="text"
              name="username"
              placeholder="Username..."
              error={errorMessage.email}
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
              <button
                type="submit"
                className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
              >
                Login
              </button>
              <div className="text-md px-12 text-center mt-4 font-medium">
                <Link
                  to="/forgot-password"
                  className="font-bold text-indigo-500 hover:underline"
                >
                  Forgot your password?
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
        </div>
      </div>
      <div className="max-w-lg mx-auto p-8 mt-2 text-center">
        <div className="font-bold text-sm text-white text-shadow">
          © 2024 ContentBlocks. All rights reserved.
        </div>
      </div>
      <div className="fixed z-[999] transition group border-[1.5px] border-purple-500 ring ring-purple-500/10 flex items-center bottom-2 right-2  bg-white pt-1 pb-1 pl-1.5 pr-1.5 md:pr-3 rounded-md">
        <img
          src="https://upcdn.io/kW15bg4/raw/uploads/cb/Group%204%20(1).png"
          alt=""
          className="w-[130px] hidden md:block"
        />
        <img
          src="https://upcdn.io/kW15bg4/raw/uploads/2023/12/13/4kxkF2t721-cb-logo-icon.png"
          alt=""
          className="w-[30px] block md:hidden"
        />
      </div>
    </main>
  );
}
