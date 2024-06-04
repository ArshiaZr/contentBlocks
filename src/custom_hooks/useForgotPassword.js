import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { useAtom } from "jotai";

import {
  emailAtom,
  errorMessageAtom,
  loadingAtom,
  passwordResetPendingAtom,
} from "../utils/atoms";

// Custom hook for handling forgot password functionality
const useForgotPassword = () => {
  const navigate = useNavigate();

  // Clerk hook for signing in
  const { signIn } = useSignIn();
  const [email, setEmail] = useAtom(emailAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [passwordPending, setPasswordPending] = useAtom(
    passwordResetPendingAtom
  );

  // Function to request password reset.
  const requestPasswordReset = async () => {
    setLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setPasswordPending(true);
    } catch (error) {
      setErrorMessage({ general: error?.errors[0]?.message });
    }
    setLoading(false);
  };

  // Function to verify reset code and set a new password.
  const verifyResetCode = async (code, password) => {
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        setLoading(false);
        setPasswordPending(false);
        // Redirect to login page
        navigate("/");
      }
    } catch (error) {
      setErrorMessage({ general: error?.errors[0]?.message });
    }
    setLoading(false);
  };

  return {
    requestPasswordReset,
    verifyResetCode,
  };
};

export default useForgotPassword;
