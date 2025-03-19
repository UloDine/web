"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { getMonthsUpToCurrent } from "@/utils/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  // Data for both charts
  const data = {
    labels: getMonthsUpToCurrent(),
    datasets: [
      {
        label: "Sales",
        data: getMonthsUpToCurrent().map(() =>
          Math.floor(Math.random() * 10000)
        ),
        backgroundColor:
          "linear-gradient(358deg, rgba(242, 255, 252, 0.19) 1.91%, rgba(0, 168, 134, 0.15) 107.96%);",
        borderColor: "#00BB95",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
      },
    ],
  };

  // Remove scales from both charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false, text: "Sales Performance" },
    },
    scales: {
      x: { display: true, grid: { display: false } }, // Hide X-axis
      y: { display: true, grid: { display: false } }, // Hide Y-axis
    },
    tension: 0.5,
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
