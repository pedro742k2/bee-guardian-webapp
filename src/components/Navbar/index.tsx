import "./styles.scss";
import "./responsive.scss";
import { useAuth } from "../../services/useAuth";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
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
  const [openMenu, setMenuOpen] = useState(false);

  const updateClass = (currentPath: string, targetPath: string) =>
    currentPath === `/${targetPath}` ? "nav-link visiting" : "nav-link";

  const changeNav = () => {
    const navBar = document.querySelector(".app-nav-container")! as HTMLElement;

    if (window.scrollY >= 66) return navBar.classList.add("scrolled");

    return navBar.classList.remove("scrolled");
  };

  useEffect(() => {
    changeNav();
    // adding the event when scroll change Logo
    window.addEventListener("scroll", changeNav);
    window.addEventListener("hashchange", () =>
      setPath("/" + document.location.hash.split("/")[1])
    );
  }, []);

  useEffect(() => setMenuOpen(false), [path]);

  const renderNavLinks = () => (
    <div className="nav-links">
      <NavLink
        title="Home"
        reloadDocument
        className={updateClass(path, "/")}
        to={`/`}
      >
        <img src={HomeIcon} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="Dashboard"
        className={updateClass(path, "/dashboard")}
        to={`/dashboard`}
      >
        <img src={DashboardIcon} alt="Dashboard" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="News"
        className={updateClass(path, "/news")}
        to={`/news`}
      >
        <img src={NewsIcon} alt="News" />
        <span>News</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="Store"
        className={updateClass(path, "/store")}
        to={`/store`}
      >
        <img src={StoreIcon} alt="Store" />
        <span>Store</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="About"
        className={updateClass(path, "/about")}
        to={`/about`}
      >
        <img src={AboutIcon} alt="About" />
        <span>About</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="Settings"
        className={updateClass(path, "/settings")}
        to={`/settings`}
      >
        <img src={SettingsIcon} alt="Settings" />
        <span>Settings</span>
      </NavLink>

      <NavLink
        reloadDocument
        title="Credits"
        className={updateClass(path, "/credits")}
        to={`/credits`}
      >
        <img src={CreditsIcon} alt="Credits" />
        <span>Credits</span>
      </NavLink>

      {isAuthenticated() ? (
        <button title="Sign out" onClick={onLogout} className="shadow-primary">
          <img src={SignoutIcon} alt="Signout" />
          <span>Sign out</span>
        </button>
      ) : (
        <NavLink
          reloadDocument
          title="Sign in"
          className={updateClass(path, "/signin")}
          to={`/signin`}
        >
          <img src={SigninIcon} alt="Signin" />
          <span>Sign in</span>
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="app-nav-container">
      <h3>
        <img className="navbar-logo" src={BeeLogo} alt="Logo" />
        BEE GUARDIAN
      </h3>

      <nav className="app-nav">
        <div
          className={`nav-wrap-container shadow-primary ${
            openMenu ? "open" : ""
          }`}
        >
          {openMenu ? (
            <GrClose
              className="menu-icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          ) : (
            <GiHamburgerMenu
              className="menu-icon"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          )}

          {openMenu ? renderNavLinks() : null}
        </div>

        <div className="nav-links-container">{renderNavLinks()}</div>
      </nav>
    </div>
  );
};
