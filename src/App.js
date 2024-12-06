import React from "react";
import {
  Navigate,
  Outlet,
  Route,
  useLocation,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
} from "react-router-dom";
import Login from "./pages/Login";
import Quote from "./pages/Quote";
import CreateQuote from "./pages/CreateQuote";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserAccessToken } from "./utils/cookie";
import { routes } from "./utils/routes";
const PrivateRoute = () => {
  const token = getUserAccessToken();
  return token ? <Outlet /> : <Navigate to={routes.login} />;
};

const Redirect = ({ path, redirectPath }) => {
  const location = useLocation();
  if (location.pathname === path) return <Navigate to={redirectPath} />;
  else return <Outlet />;
};

const NotFound = () => {
  return (
    <div className=" h-screen w-full flex items-center justify-center text-3xl font-semibold ">
      Woops! You are on the 404 path!
      <Link to={routes.quote} className=" block underline">
        Click to get back!
      </Link>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Redirect path={"/"} redirectPath={routes.quote} />}
    >
      <Route path="*" element={<NotFound />} />
      <Route path={routes.login} element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path={routes.quote} element={<Quote />} />
        <Route path={routes.createQuote} element={<CreateQuote />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
