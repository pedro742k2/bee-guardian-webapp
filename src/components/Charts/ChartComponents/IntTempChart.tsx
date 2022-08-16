import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { intTempOptions } from "../settings/options";

interface IProps {
  intTemp: number[];
  reading_date: string[];
}

export const IntTempChart = ({ intTemp, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector(
      "#int-temp-chart"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: intTemp,
          ...intTempOptions,
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
          text: "Internal Temperature Readings",
          font: {
            size: 20,
          },
        },
      },
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, [intTemp]);

  return <canvas id="int-temp-chart" className="chart shadow-primary" />;
};
