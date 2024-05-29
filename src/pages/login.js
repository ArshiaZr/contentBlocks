import { Link } from "react-router-dom";
import buttonStyles from "../styles/ui/button.module.scss";
import textInputStyles from "../styles/ui/textInput.module.scss";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email });
  };
  return (
    <main>
      <div
        className="p-12 bg-purple-600 min-h-screen"
        style={{
          backgroundImage:
            'url("https://upcdn.io/kW15bg4/image/uploads/2024/01/07/4kuTEvpN7d-Untitled design (7).png")',
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-lg mx-auto p-8 mt-[120px] text-center">
          <div
            style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.1)" }}
            className="font-bold text-4xl text-white"
          >
            Welcome Back!
          </div>
        </div>
        <div className="max-w-lg mx-auto bg-white border-[2px] border-black p-8 rounded-md">
          <div className="">
            <form onSubmit={handleLogin}>
              <div className="mb-3 mt-1 flex flex-col gap-1">
                <h3 className="text-lg font-bold">Email Address:</h3>
                <input
                  type="email"
                  placeholder="Email..."
                  className={`w-full ${textInputStyles.input} ${textInputStyles.primary}`}
                  name="email"
                />
              </div>
              <div className="mb-3 mt-1 flex flex-col gap-1">
                <h3 className="text-lg font-bold">Password:</h3>
                <input
                  type="password"
                  placeholder="********"
                  className={`w-full ${textInputStyles.input} ${textInputStyles.primary}`}
                  name="password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full ${buttonStyles.button} ${buttonStyles.primary}`}
                >
                  Login
                </button>
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
                  <Link to="/register">
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
              <div className="text-md font-medium text-purple-600 mt-3">
                ** We need your email!
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-lg mx-auto p-8 mt-2 text-center">
          <div
            style={{ textShadow: "3px 3px 0px rgba(0, 0, 0, 0.1)" }}
            className="font-bold text-sm text-white"
          >
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
      </div>
    </main>
  );
}
