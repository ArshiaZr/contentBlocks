import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgot-password";
import NotFound from "./pages/not-found";
import DeprecatedLogin from "./pages/deprecated-login";
import DeprecatedSignUp from "./pages/deprecated-signup";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute element={<Dashboard />} redirectPath="/login" />
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute element={<Login />} redirectPath="/" reverse={true} />
        }
      />
      <Route
        path="/deprecated-login"
        element={
          <ProtectedRoute
            element={<DeprecatedLogin />}
            redirectPath="/"
            reverse={true}
          />
        }
      />
      <Route
        path="/deprecated-signup"
        element={
          <ProtectedRoute
            element={<DeprecatedSignUp />}
            redirectPath="/"
            reverse={true}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute
            element={<SignUp />}
            redirectPath="/"
            reverse={true}
          />
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
