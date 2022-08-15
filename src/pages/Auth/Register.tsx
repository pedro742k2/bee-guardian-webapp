import { useState, ChangeEvent } from "react";
import { useAuth } from "../../services/useAuth";
import "./Auth.scss";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { TbSwitch2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IPopup } from "../../App";

interface IProps {
  updatePopup: (props: IPopup) => void;
}

export const Register = ({ updatePopup }: IProps) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const switchPage = () => {
    navigate("/signin");
  };

  const updateName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const updatePhone = (event: ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value);

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const updateRepeatPassword = (event: ChangeEvent<HTMLInputElement>) =>
    setRepeatPassword(event.target.value);

  const updateRemember = (event: ChangeEvent<HTMLInputElement>) =>
    setRemember(event.target.checked);

  const handleSubmit = async () => {
    if (password !== repeatPassword)
      return updatePopup({
        message: "Passwords do not match",
        color: "red",
        duration: 5,
        duration_unit: "s",
      });

    const res = await auth.onRegister({
      remember,
      name,
      username,
      email,
      phone,
      password,
    });

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
          <BsFillPersonBadgeFill className="btn-icon" />
          Sign up
        </h1>

        <input
          onChange={updateName}
          className="form-input"
          type="text"
          placeholder="Name"
        />

        <input
          onChange={updateUsername}
          className="form-input"
          type="text"
          placeholder="Username"
        />

        <input
          onChange={updateEmail}
          className="form-input"
          type="text"
          placeholder="Email"
        />

        <input
          onChange={updatePhone}
          className="form-input"
          type="text"
          placeholder="Phone"
        />

        <input
          onChange={updatePassword}
          className="form-input"
          id="user-input"
          type="password"
          placeholder="Password"
        />

        <input
          onChange={updateRepeatPassword}
          className="form-input"
          id="password-input"
          type="password"
          placeholder="Repeat password"
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
          SIGN UP
        </button>
      </div>

      <div className="switch-container">
        <h1>
          <AiOutlineLock className="btn-icon" />
          Sign In
        </h1>
        <span>
          Already have an account?
          <br />
          Sign in here.
        </span>
        <button className="primary-btn" onClick={switchPage}>
          <TbSwitch2 className="btn-icon" />
          SIGN IN
        </button>
      </div>
    </main>
  );
};
