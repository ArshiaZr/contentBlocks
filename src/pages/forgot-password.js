// All of the commented lines are for the next steps since the recovering password was not part of the assignment.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useAtom } from "jotai";
import buttonStyles from "../styles/ui/button.module.scss";
import Input from "../components/Input";

// import { usernameAtom, errorMessageAtom } from "../utils/atoms";

export default function ForgotPassword() {
  // const [email, setEmail] = useAtom(usernameAtom);
  // const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const onInputChange = (e) => {
    // const { name, value } = e.target;
    // switch (name) {
    //   case "email":
    //     // setEmail(value);
    //     break;
    //   default:
    //     break;
    // }
  };

  // Update page title
  useEffect(() => {
    document.title = "ContentBlocks | Forgot Password";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Not implemented yet");
  };
  return (
    <main className="p-12 bg-purple-600 min-h-screen flex items-center justify-center flex-col background">
      <div className="max-w-lg mx-auto p-8 text-center ">
        <div className="font-bold text-4xl text-white title-class">
          Recover Your Account
        </div>
      </div>
      <div className="form-wrapper-width mx-auto bg-white border-[2px] border-black p-8 rounded-md">
        <div>
          {false > 0 ? (
            <div className="text-md font-medium text-purple-600 mb-2 italic">
              *
            </div>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit}>
            <Input
              title="Email:"
              type="email"
              name="email"
              placeholder="Email..."
              error=""
              onChange={onInputChange}
            />
            <div>
              <button
                type="submit"
                className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
              >
                Login
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
