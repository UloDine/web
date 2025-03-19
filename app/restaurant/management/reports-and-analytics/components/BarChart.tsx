"use client"; // Required for Next.js App Router (if using app directory)

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getMonthsUpToCurrent } from "@/utils/helpers";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const data = {
    labels: getMonthsUpToCurrent(),
    datasets: [
      {
        label: "Performance",
        data: getMonthsUpToCurrent().map(() =>
          Math.floor(Math.random() * 10000)
        ),
        backgroundColor: "#00BB95",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { display: true, grid: { display: false } }, // Hide X-axis
      y: { display: true, grid: { display: false } }, // Hide Y-axis
    },
    elements: {
      bar: {
        borderRadius: 20, // Rounds the bar edges
        barThickness: 10, // Controls bar width (adjust as needed)
      },
    },
  };

  return <Bar data={data} options={options} />;
}
