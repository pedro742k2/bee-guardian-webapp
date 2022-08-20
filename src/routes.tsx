import { HashRouter, Routes, Route } from "react-router-dom";
// Protected Route Util
import { ProtectedRoute } from "./utils/ProtectedRoute";
// Pages
import { Home } from "./pages/Home/Home";
import { Signin } from "./pages/Auth/Signin";
import { Register } from "./pages/Auth/Register";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Credits } from "./pages/Credits/Credits";
// Components
import { NavBar } from "./components/Navbar";
import { IPopup } from "./App";
import { InDevelopment } from "./pages/InDevelopment/InDevelopment";

export interface IProps {
  updatePopup: (props: IPopup) => void;
}

export const Router = ({ updatePopup }: IProps) => (
  <HashRouter>
    <NavBar />

    <div className="nav-bar-margin-box"></div>

    <Routes>
      <Route index element={<InDevelopment />} />

      <Route
        path={`/dashboard`}
        element={
          <ProtectedRoute>
            <Dashboard updatePopup={updatePopup} />
          </ProtectedRoute>
        }
      />

      <Route path={`/news`} element={<InDevelopment />} />

      <Route path={`/store`} element={<InDevelopment />} />

      <Route path={`/about`} element={<InDevelopment />} />

      <Route path={`/settings`} element={<InDevelopment />} />

      <Route path={`/credits`} element={<Credits />} />

      <Route path={`/signin`} element={<Signin updatePopup={updatePopup} />} />

      <Route
        path={`/register`}
        element={<Register updatePopup={updatePopup} />}
      />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  </HashRouter>
);
