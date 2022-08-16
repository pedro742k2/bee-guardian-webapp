import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { batteryOptions } from "../settings/options";

interface IProps {
  battery: number[];
  reading_date: string[];
}

export const BatteryChart = ({ battery, reading_date }: IProps) => {
  useEffect(() => {
    const canvas = document.querySelector(
      "#battery-chart"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    Chart.register(...registerables);
    Chart.defaults.color = "#FFDDDD";
    Chart.defaults.font.family = "Roboto";

    const chartData = {
      labels: reading_date,
      datasets: [
        {
          data: battery,
          ...batteryOptions,
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
          text: "Battery Readings",
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
  }, [battery]);

  return <canvas id="battery-chart" className="chart shadow-primary" />;
};
