import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { weightOptions } from "../settings/options";

interface IProps {
  weight: number[];
  reading_date: string[];
}

export const WeightChart = ({ weight, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector("#weight-chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: weight,
          ...weightOptions,
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
          text: "Weight Readings",
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
  }, [weight]);

  return <canvas id="weight-chart" className="chart shadow-primary" />;
};
