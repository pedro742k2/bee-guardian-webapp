import { useState, ChangeEvent } from "react";
import { useAuth } from "../../services/useAuth";
import "./Auth.scss";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { TbSwitch2 } from "react-icons/tb";
import { IPopup } from "../../App";

interface IProps {
  updatePopup: (props: IPopup) => void;
}

export const Signin = ({ updatePopup }: IProps) => {
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const updateUser = (event: ChangeEvent<HTMLInputElement>) =>
    setUser(event.target.value);

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const updateRemember = (event: ChangeEvent<HTMLInputElement>) =>
    setRemember(event.target.checked);

  const switchPage = () => {
    navigate("/register");
  };

  const handleSubmit = async () => {
    const res = await onLogin({ remember, user, password });

    const { error } = res;

    if (error)
      return updatePopup({
        message: error,
        color: "red",
        duration: 5,
        duration_unit: "s",
      });

    return navigate("/dashboard");
  };

  return (
    <main className="form-container">
      <div className="auth-container">
        <h1>
          <AiOutlineLock className="btn-icon" />
          Sign in
        </h1>

        <input
          className="form-input"
          type="text"
          placeholder="Username or Email Address"
          onChange={updateUser}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          onChange={updatePassword}
        />

        <div className="form-check">
          <input
            onChange={updateRemember}
            className="form-check-input"
            type="checkbox"
            id="remember-me-login"
          />
          <label className="form-check-label" htmlFor="remember-me-login">
            Remember me
          </label>
        </div>

        <button className="primary-btn submit-btn" onClick={handleSubmit}>
          <AiOutlineUnlock className="btn-icon" />
          SIGN IN
        </button>
      </div>

      <div className="switch-container">
        <h1>
          <BsFillPersonBadgeFill className="btn-icon" />
          Sign up
        </h1>
        <span>
          Don't have an account?
          <br />
          Register here.
        </span>
        <button className="primary-btn" onClick={switchPage}>
          <TbSwitch2 className="btn-icon" />
          SIGN UP
        </button>
      </div>
    </main>
  );
};
