import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { extTempOptions } from "../settings/options";

interface IProps {
  extTemp: number[];
  reading_date: string[];
}

export const ExtTempChart = ({ extTemp, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector(
      "#ext-temp-chart"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: extTemp,
          ...extTempOptions,
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
          text: "External Temperature Readings",
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
  }, [extTemp]);

  return <canvas id="ext-temp-chart" className="chart shadow-primary" />;
};
