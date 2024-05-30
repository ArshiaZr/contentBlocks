// Desc: ProtectedRoute component for handling protected routes

import React from "react";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const ProtectedRoute = ({
  element,
  redirectPath = "/login",
  reverse = false,
}) => {
  // if reverse is true, we want to show the element if the user is not signed in
  if (reverse) {
    return (
      <>
        <SignedIn>{<Navigate to={redirectPath} />}</SignedIn>
        <SignedOut>{element}</SignedOut>
      </>
    );
  }

  return (
    <>
      <SignedIn>{element}</SignedIn>
      <SignedOut>{<Navigate to={redirectPath} />}</SignedOut>
    </>
  );
};

export default ProtectedRoute;
