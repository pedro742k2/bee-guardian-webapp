import "./styles.scss";
import DevIcon from "../../Assets/Icons/in-dev.png";

export const InDevelopment = () => {
  return (
    <div className="in-dev-container">
      <div>
        <h1>
          <img src={DevIcon} alt="Not Found" />
          This page is under development/maintenance.
        </h1>
        <p>Please try again later.</p>
      </div>
    </div>
  );
};
