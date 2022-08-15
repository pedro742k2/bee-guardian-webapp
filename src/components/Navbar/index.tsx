import "./styles.scss";
import { useAuth } from "../../services/useAuth";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// Title logo
import BeeLogo from "../../Assets/Icons/bee.png";
// Button icons
import HomeIcon from "../../Assets/Icons/NavBar/home.svg";
import DashboardIcon from "../../Assets/Icons/NavBar/dashboard.svg";
import NewsIcon from "../../Assets/Icons/NavBar/news.svg";
import StoreIcon from "../../Assets/Icons/NavBar/store.svg";
import AboutIcon from "../../Assets/Icons/NavBar/about.svg";
import SettingsIcon from "../../Assets/Icons/NavBar/settings.svg";
import CreditsIcon from "../../Assets/Icons/NavBar/credits.svg";
import SigninIcon from "../../Assets/Icons/NavBar/signin.svg";
import SignoutIcon from "../../Assets/Icons/NavBar/signout.svg";

export const NavBar = () => {
  const { isAuthenticated, onLogout } = useAuth();
  const [path, setPath] = useState(document.location.pathname);

  const updateClass = (targetPath: string) =>
    path === targetPath ? "nav-link visiting" : "nav-link";

  useEffect(() => setPath(document.location.pathname));

  return (
    <div className="app-nav-container">
      <h3>
        <img src={BeeLogo} alt="Logo" />
        BEE GUARDIAN
      </h3>
      <nav className="app-nav">
        <NavLink reloadDocument className={updateClass("/")} to="/">
          <img src={HomeIcon} alt="Home" />
          <span>Home</span>
        </NavLink>

        <NavLink
          reloadDocument
          className={updateClass("/dashboard")}
          to="/dashboard"
        >
          <img src={DashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink reloadDocument className={updateClass("/news")} to="/news">
          <img src={NewsIcon} alt="News" />
          <span>News</span>
        </NavLink>

        <NavLink reloadDocument className={updateClass("/store")} to="/store">
          <img src={StoreIcon} alt="Store" />
          <span>Store</span>
        </NavLink>

        <NavLink reloadDocument className={updateClass("/about")} to="/about">
          <img src={AboutIcon} alt="About" />
          <span>About</span>
        </NavLink>

        <NavLink
          reloadDocument
          className={updateClass("/settings")}
          to="/settings"
        >
          <img src={SettingsIcon} alt="Settings" />
          <span>Settings</span>
        </NavLink>

        <NavLink
          reloadDocument
          className={updateClass("/credits")}
          to="/credits"
        >
          <img src={CreditsIcon} alt="Credits" />
          <span>Credits</span>
        </NavLink>

        {isAuthenticated() ? (
          <button onClick={onLogout}>
            <img src={SignoutIcon} alt="Signout" />
            <span>Sign out</span>
          </button>
        ) : (
          <NavLink
            reloadDocument
            className={updateClass("/signin")}
            to={"/signin"}
          >
            <img src={SigninIcon} alt="Signin" />
            <span>Sign in</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};
