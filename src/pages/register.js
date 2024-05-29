import { Link } from "react-router-dom";

import buttonStyles from "../styles/ui/button.module.scss";

import Input from "../components/Input";

export default function Register() {
  const onInputChange = (e) => {
    console.log(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="p-12 bg-purple-600 min-h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage:
          'url("https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png")',
        backgroundSize: "cover",
      }}
    >
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
      <div className="max-w-lg mx-auto p-8 text-center ">
        <div
          className="font-bold text-4xl text-white"
          style={{ textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px" }}
        >
          <span>Create Your Account</span>
        </div>
      </div>
      <div className="max-w-lg mx-auto bg-white border-[2px] border-black p-8 rounded-md">
        <div className="">
          <form onSubmit={handleRegister}>
            <Input
              title="Username:"
              type="text"
              placeholder="Username..."
              name="username"
              error=""
              onChange={onInputChange}
            />
            <Input
              title="Email Address:"
              type="email"
              placeholder="Email..."
              name="email"
              error=""
              onChange={onInputChange}
            />
            <Input
              title="Password:"
              type="password"
              placeholder="********"
              name="password"
              error=""
              onChange={onInputChange}
            />
            <Input
              title="Confirm Password:"
              type="password"
              placeholder="********"
              name="confirmPassword"
              error=""
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
                to="/login"
                className="font-bold text-indigo-500 hover:underline"
              >
                Already a member? Login here.
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-lg mx-auto p-8 mt-2 text-center">
        <div
          className="font-bold text-sm text-white"
          style={{ textShadow: "rgba(0, 0, 0, 0.1) 3px 3px 0px" }}
        >
          © 2024 ContentBlocks. All rights reserved.
        </div>
      </div>
    </div>
  );
}
