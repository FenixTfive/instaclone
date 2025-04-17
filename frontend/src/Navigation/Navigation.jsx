import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { useSelector } from "react-redux";
import Home from "../Pages/Home";
import User from "../Pages/User";
import Error404 from "../Pages/Error404";
import Auth from "../Pages/Auth";

const Navigation = () => {
  const auth = useSelector((state) => state.authReducer.auth);
  const PrivateRoutes = () => {
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout>
              <PrivateRoutes />
            </MainLayout>
          }
        >
          <Route path="/" exact element={<Home />} />
          <Route path="/:username" exact element={<User />} />
          <Route component={Error404} />
        </Route>
        {/* <Route path="/login" exact element={<Auth />} /> */}
        <Route path="*" exact element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
