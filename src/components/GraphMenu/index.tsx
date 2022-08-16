import { ChangeEvent, Fragment } from "react";
import "./styles.scss";
import { FcInfo } from "react-icons/fc";
import ChartOptionsIcon from "../../Assets/Icons/chart-options.png";

interface IProps {
  updateSelectedType: (event: ChangeEvent<HTMLSelectElement>) => void;
  updateTargetedDate: (event: ChangeEvent<HTMLInputElement>) => void;
  clearDate: () => void;
}

export const GraphMenu = ({
  updateSelectedType,
  updateTargetedDate,
  clearDate,
}: IProps) => {
  const clearDateInput = () => {
    const dateInput = document.querySelector(
      "#target-date-input"
    ) as HTMLInputElement;

    dateInput.value = "";

    return clearDate();
  };

  return (
    <div className="graph-menu-container">
      <h1 className="charts-title shadow-primary">
        <img src={ChartOptionsIcon} alt="Charts" />
        Chart Options
      </h1>

      <div className="chart-option-inputs">
        <div>
          <select
            className="shadow-primary"
            onChange={updateSelectedType}
            title={
              "Readings from last hour and last day return every reading available.\nReadings from last week and last month return every day average.\nReadings from last year return every week average."
            }
          >
            <option value={0}>Readings from last hour</option>
            <option value={1}>Readings from last day</option>
            <option value={2}>Readings from last week</option>
            <option value={3}>Readings from last month</option>
            <option value={4}>Readings from last year</option>
          </select>
          <FcInfo
            className="info-icon"
            title={
              "Readings from last hour and last day return every reading available.\nReadings from last week and last month return every day average.\nReadings from last year return every week average."
            }
          />
        </div>

        <div>
          <input
            id="target-date-input"
            type="datetime-local"
            onChange={updateTargetedDate}
          />
          <button onClick={clearDateInput}>Clear</button>
        </div>
      </div>
    </div>
  );
};
