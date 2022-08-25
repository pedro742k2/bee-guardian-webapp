import { Fragment } from "react";
import { IEveryData } from "../../Types/Hive";
import "./styles.scss";
// Icons
import WeightIcon from "../../Assets/Icons/LastReadings/weight.png";
import IntTempIcon from "../../Assets/Icons/LastReadings/int_temp.png";
import ExtTempIcon from "../../Assets/Icons/LastReadings/ext_temp.png";
import HumidityIcon from "../../Assets/Icons/LastReadings/humidity.png";
import BatteryIcon from "../../Assets/Icons/LastReadings/battery.png";
import NotFoundIcon from "../../Assets/Icons/LastReadings/nothing.png";
import SPVIcon from "../../Assets/Icons/LastReadings/spv.png";
import CalendarIcon from "../../Assets/Icons/LastReadings/calendar.png";

interface IProps {
  lastReadings: IEveryData | undefined;
}

export const LastReadings = ({ lastReadings }: IProps) => {
  const renderValues = (value: string | number | undefined, unit: string) =>
    value ? (
      <p>
        {value} {unit}
      </p>
    ) : (
      <div className="not-found-container">
        <img src={NotFoundIcon} alt="Not Found" />
        <p>No readings.</p>
      </div>
    );

  const getDate = (date: string | undefined) =>
    date
      ? `Readings from:
    ${new Date(date || "").toLocaleTimeString()} at 
    ${new Date(date || "").toDateString()}`
      : "This hive has no readings.";

  return (
    <main className="last-readings-container shadow-primary">
      <h1>Last Readings</h1>

      <Fragment>
        <hr className="divider" />

        <div className="values-box-container">
          <div className="values-box">
            <p className="values-box-title">
              <img src={WeightIcon} alt="weight" />
              Weight
            </p>
            {renderValues(lastReadings?.weight, "kg")}
          </div>

          <div className="values-box">
            <p className="values-box-title">
              <img src={IntTempIcon} alt="Int. Temp." />
              Internal Temperature
            </p>
            {renderValues(lastReadings?.internal_temperature, "ºC")}
          </div>

          <div className="values-box shadow-primary">
            <p className="values-box-title">
              <img src={ExtTempIcon} alt="Ext. Temp." />
              External Temperature
            </p>
            {renderValues(lastReadings?.external_temperature, "ºC")}
          </div>

          <div className="values-box">
            <p className="values-box-title">
              <img src={HumidityIcon} alt="Humidity" />
              Relative Humidity
            </p>
            {renderValues(lastReadings?.humidity, "%")}
          </div>

          <div className="values-box">
            <p className="values-box-title">
              <img src={BatteryIcon} alt="Battery" />
              Battery
            </p>
            {renderValues(lastReadings?.battery, "%")}
          </div>

          <div className="values-box">
            <p className="values-box-title">
              <img src={SPVIcon} alt="SPV" />
              Solar Panel Voltage
            </p>
            {renderValues(lastReadings?.solar_panel_voltage, "volts")}
          </div>
        </div>

        <div className="last-reading-date">
          {lastReadings?.reading_date ? (
            <img src={CalendarIcon} alt="Calendar" />
          ) : null}
          <p>{getDate(lastReadings?.reading_date)}</p>
        </div>
      </Fragment>
    </main>
  );
};
