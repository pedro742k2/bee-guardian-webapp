import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { humidityOptions } from "../settings/options";

interface IProps {
  humidity: number[];
  reading_date: string[];
}

export const HumidityChart = ({ humidity, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector(
      "#humidity-chart"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: humidity,
          ...humidityOptions,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      color: "#FFDDDD",
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },

      plugins: {
        title: {
          display: true,
          padding: 10,
          text: "Humidity Readings",
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
  }, [humidity]);

  return <canvas id="humidity-chart" className="chart shadow-primary" />;
};
