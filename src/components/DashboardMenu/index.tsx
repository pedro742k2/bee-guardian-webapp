import "./styles.scss";
import dashboardNavIcon from "../../Assets/Icons/dashboard-nav.png";

interface IProps {
  executeScroll: (param: string) => void;
}

export const DashboardMenu = ({ executeScroll }: IProps) => {
  return (
    <nav className="dashboard-menu-nav">
      <h1 className="container-title">
        <img src={dashboardNavIcon} alt="Dashboard navigation" />
        Dashboard Navigation
      </h1>

      <hr className="divider" />

      <div>
        <button className="shadow-primary" onClick={() => executeScroll("0")}>
          Hive Selector
        </button>
        <button className="shadow-primary" onClick={() => executeScroll("1")}>
          Last Reading {"&"} Add Hive
        </button>
        <button className="shadow-primary" onClick={() => executeScroll("2")}>
          Charts Parameters
        </button>
        <button className="shadow-primary" onClick={() => executeScroll("3")}>
          Charts
        </button>
        <button className="shadow-primary" onClick={() => executeScroll("4")}>
          Notes {"&"} Add notes
        </button>
      </div>
    </nav>
  );
};
