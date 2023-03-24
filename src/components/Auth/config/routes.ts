import HomePage from "../../../pages/HomePage/HomePage";
import ForgotPasswordPage from "../AuthPages/Forgot";
import LogIn from "../AuthPages/LogIn";
import LogOut from "../AuthPages/LogOut";
import Register from "../AuthPages/Register";
import ResetPasswordPage from "../AuthPages/Reset";
import IRoute from "../interfaces/route";

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: HomePage,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    name: "Register",
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: LogIn,
    name: "Login",
    protected: false,
  },
  {
    path: "/logout",
    exact: true,
    component: LogOut,
    name: "Logout page",
    protected: true,
  },
  {
    path: "/forget",
    exact: true,
    component: ForgotPasswordPage,
    name: "Forgot Password page",
    protected: false,
  },
  {
    path: "/reset",
    exact: true,
    component: ResetPasswordPage,
    name: "Reset Password page",
    protected: false,
  },
];
