import { BrowserRouter, Routes, Route } from "react-router-dom";
// Protected Route Util
import { ProtectedRoute } from "./utils/ProtectedRoute";
// Pages
import { Home } from "./pages/Home/Home";
import { Signin } from "./pages/Auth/Signin";
import { Register } from "./pages/Auth/Register";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { Dashboard } from "./pages/Dashboard/Dashboard";
// Components
import { NavBar } from "./components/Navbar";
import { IPopup } from "./App";

export interface IProps {
  updatePopup: (props: IPopup) => void;
}

export const Router = ({ updatePopup }: IProps) => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signin" element={<Signin updatePopup={updatePopup} />} />
      <Route
        path="/register"
        element={<Register updatePopup={updatePopup} />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard updatePopup={updatePopup} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);
