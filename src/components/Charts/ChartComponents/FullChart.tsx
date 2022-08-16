import { useEffect } from "react";
import { IChartData } from "../index";
import { Chart, registerables } from "chart.js";
import {
  batteryOptions,
  extTempOptions,
  humidityOptions,
  intTempOptions,
  spvOptions,
  weightOptions,
} from "../settings/options";

interface IProps {
  fullData: IChartData;
}

export const FullChart = ({ fullData }: IProps) => {
  useEffect(() => {
    const {
      weightData,
      intTempData,
      extTempData,
      humidityData,
      batteryData,
      spvData,
      reading_date,
    } = fullData;

    const canvas = document.querySelector("#full-chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: weightData,
          ...weightOptions,
        },
        {
          data: intTempData,
          ...intTempOptions,
        },
        {
          data: extTempData,
          ...extTempOptions,
        },
        {
          data: humidityData,
          ...humidityOptions,
        },
        {
          data: batteryData,
          ...batteryOptions,
        },
        {
          data: spvData,
          ...spvOptions,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      color: "#FFDDDD",
      scales: {
        y: {
          beginAtZero: true,
        },
      },

      plugins: {
        title: {
          display: true,
          padding: 10,
          text: "Full Readings",
          font: {
            size: 20,
          },
        },
      },
    };

    const fullChart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      fullChart.destroy();
    };
  }, [fullData]);

  return <canvas id="full-chart" className="chart shadow-primary" />;
};
