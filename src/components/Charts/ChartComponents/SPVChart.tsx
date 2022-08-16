import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { spvOptions } from "../settings/options";

interface IProps {
  spv: number[];
  reading_date: string[];
}

export const SPVChart = ({ spv, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector("#spv-chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: spv,
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
          text: "Solar Panel Voltage Readings",
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
  }, [spv]);

  return <canvas id="spv-chart" className="chart shadow-primary" />;
};
