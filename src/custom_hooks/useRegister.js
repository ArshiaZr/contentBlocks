import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { useAtom } from "jotai";

import {
  emailAtom,
  passwordAtom,
  errorMessageAtom,
  confirmPasswordAtom,
  usernameAtom,
  loadingAtom,
  verifyPendingAtom,
} from "../utils/atoms";
import { validatePassword, validateEmail } from "../utils/validations";

// Custom hook for registration functionality.
export const useRegister = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const [_, setLoading] = useAtom(loadingAtom);
  const [verifyPending, setVerifyPending] = useAtom(verifyPendingAtom);

  // Function to register a new user.
  const registerUser = async () => {
    setErrorMessage({});

    // initialize temporary errors object
    let errors = {};

    // validate form fields
    if (!username) errors.username = "Please fill in username field";
    if (!email) errors.email = "Please fill in email field";
    if (!validateEmail(email)) errors.email = "Invalid email";
    if (!password) errors.password = "Please fill in password field";
    if (!confirmPassword)
      errors.confirmPassword = "Please fill in confirm password field";
    const passwordValidation = validatePassword(password);
    if (passwordValidation !== null) errors.password = passwordValidation;
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    // set the errors object to the errorMessage atom
    setErrorMessage(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    // create a new user account
    try {
      await signUp.create({
        emailAddress: email,
        password,
        username,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        redirectUrl: process.env.REACT_APP_REDIRECT_URL,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage({});
      setVerifyPending(true);
    } catch (error) {
      setErrorMessage({ general: error?.errors[0]?.message });
    }
    setLoading(false);
  };

  // Function to verify email after registration.
  const verifyEmail = async (code) => {
    setErrorMessage({});
    if (!isLoaded || !verifyPending)
      setErrorMessage({ general: "Invalid request" });
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });
      if (
        completeSignUp.status === "complete" ||
        completeSignUp.status === "needs_first_factor"
      ) {
        // Set the active session
        await setActive({ session: completeSignUp.createdSessionId });
        setLoading(false);
        setVerifyPending(false);
        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      setErrorMessage({ general: error?.errors[0]?.message });
    }
    setLoading(false);
  };

  return {
    registerUser,
    verifyEmail,
  };
};

export default useRegister;
