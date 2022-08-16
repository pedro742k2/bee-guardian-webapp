import "./styles.scss";
import { useState, useEffect, Fragment } from "react";
import { IData } from "../../Types/Hive";
import { FullChart } from "./ChartComponents/FullChart";
import ChartIcon from "../../Assets/Icons/line-chart.png";
import WarningIcon from "../../Assets/Icons/warning.png";
import { WeightChart } from "./ChartComponents/WeightChart";
import { IntTempChart } from "./ChartComponents/IntTempChart";
import { ExtTempChart } from "./ChartComponents/ExtTempChart";
import { HumidityChart } from "./ChartComponents/HumidityChart";
import { BatteryChart } from "./ChartComponents/BatteryChart";
import { SPVChart } from "./ChartComponents/SPVChart";

export interface IChartData {
  weightData: number[];
  intTempData: number[];
  extTempData: number[];
  humidityData: number[];
  batteryData: number[];
  spvData: number[];
  reading_date: string[];
}

interface IProps {
  data: IData[] | undefined;
}

export const Charts = ({ data }: IProps) => {
  const [chartData, setChartData] = useState<IChartData>({
    weightData: [],
    intTempData: [],
    extTempData: [],
    humidityData: [],
    batteryData: [],
    spvData: [],
    reading_date: [],
  });

  useEffect(() => {
    const tempChartData = {
      weightData: [],
      intTempData: [],
      extTempData: [],
      humidityData: [],
      batteryData: [],
      spvData: [],
      reading_date: [],
    } as IChartData;

    if (data?.length) {
      data.map((values) => {
        const {
          weight,
          internal_temperature,
          external_temperature,
          humidity,
          battery,
          solar_panel_voltage,
          reading_date,
          day,
          week,
        } = values;

        let dateFormated;

        if (reading_date) {
          dateFormated = new Date(reading_date).toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } else if (day) {
          dateFormated = new Date(day).toLocaleDateString();
        } else {
          dateFormated = `Week ${week}`;
        }

        tempChartData.weightData.push(weight);
        tempChartData.intTempData.push(internal_temperature);
        tempChartData.extTempData.push(external_temperature);
        tempChartData.humidityData.push(humidity);
        tempChartData.batteryData.push(battery);
        tempChartData.spvData.push(solar_panel_voltage);
        tempChartData.reading_date.push(dateFormated);
      });

      setChartData(tempChartData);
    }
  }, [data]);

  return (
    <div className="charts-container">
      <h1 className="charts-title shadow-primary">
        <img src={ChartIcon} alt="Charts" />
        Reading Charts
      </h1>

      {data?.length ? (
        <Fragment>
          {/* Full Chart */}
          <FullChart fullData={chartData} />

          {/* Individual Charts: */}
          <WeightChart
            weight={chartData?.weightData}
            reading_date={chartData?.reading_date}
          />

          <IntTempChart
            intTemp={chartData?.intTempData}
            reading_date={chartData?.reading_date}
          />

          <ExtTempChart
            extTemp={chartData?.extTempData}
            reading_date={chartData?.reading_date}
          />

          <HumidityChart
            humidity={chartData?.humidityData}
            reading_date={chartData?.reading_date}
          />

          <BatteryChart
            battery={chartData?.batteryData}
            reading_date={chartData?.reading_date}
          />

          <SPVChart
            spv={chartData?.spvData}
            reading_date={chartData?.reading_date}
          />
        </Fragment>
      ) : (
        <div className="no-data-container shadow-primary">
          <h1>
            <img src={WarningIcon} alt="warning " /> Warning
          </h1>
          <h2>No data available.</h2>
          <h3>
            Try to select a hive, or switch the measurement type or the targeted
            date.
          </h3>
        </div>
      )}
    </div>
  );
};
