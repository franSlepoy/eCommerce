import { Route, Routes } from "react-router-dom";

import Login from "../components/pages/login/Login";
import { routes } from "./routes";
import Navbar from "../components/layout/navBar/NavBar";
import Register from "../components/pages/register/Register";
import ForgotPassword from "../components/pages/forgotPassword/FotgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route /* element={<RoutesManageUsers />} */>
        <Route element={<Navbar />} >
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      </Route>

      {/* <Route element={<RoutesManageAdmin />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
        </Route>
      </Route> */}

      {/* login  */}

      <Route path="/login" element={<Login />} />

      {/* register  */}
      <Route path="/register" element={<Register />} />
       {/* forgot password  */}
       <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default AppRouter;
