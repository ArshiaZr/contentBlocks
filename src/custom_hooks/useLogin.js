import { useNavigate } from "react-router-dom";
import { useSignIn, useClerk } from "@clerk/clerk-react";
import { useAtom } from "jotai";

import {
  passwordAtom,
  errorMessageAtom,
  usernameAtom,
  loadingAtom,
} from "../utils/atoms";

// Custom hook for registration functionality.
const useLogin = () => {
  // States
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [_, setLoading] = useAtom(loadingAtom);

  // for redirecting user to login page
  const navigate = useNavigate();

  // Clerk's setActive hook
  const { setActive } = useClerk();

  // Clerk's signIn hook
  const { signIn } = useSignIn();

  const handleLogin = async () => {
    // initialize temporary errors object
    let errors = {};
    if (!username) errors.username = "Please fill in username field";
    if (!password) errors.password = "Please fill in password field";

    // set errors to error message atom
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
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
        setLoading(false);
        navigate("/");
      } else {
        setErrorMessage({ general: "Invalid username or password" });
      }
    } catch (error) {
      setErrorMessage({ general: "Invalid username or password" });
    }
    setLoading(false);
  };

  return {
    handleLogin,
  };
};

export default useLogin;
