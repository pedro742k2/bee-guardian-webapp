import "./styles.scss";
import { GrClose } from "react-icons/gr";

export interface IPopup {
  message: string;
  color: "green" | "yellow" | "red";
}

export interface IPopupInfo extends IPopup {
  closePopup: () => void;
}

export const Popup = ({ message, color, closePopup }: IPopupInfo) => {
  const getColor = (color: string) => {
    switch (color) {
      case "red":
        return "rgba(255, 40, 40, 0.5)";
      case "green":
        return "rgba(24, 243, 87, 0.5)";
      case "yellow":
        return "rgba(243, 242, 24, 0.5)";
    }
  };

  return (
    <div
      style={{ backgroundColor: getColor(color) }}
      className="popup-container animate__animated animate__bounceInDown"
    >
      <p>{message}</p>
      <GrClose className="close-popup-icon" onClick={closePopup} />
    </div>
  );
};
