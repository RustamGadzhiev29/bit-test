import React from "react";

import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./AreaChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "black",
      backgroundColor: "#ffff",
    },
  ],
};

// eslint-disable-next-line no-undef
export const AreaChart = (): JSX.Element => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Потребление</div>{" "}
      </div>
      <div className={styles.lineContainer}>
        <i className={styles.up} />
        <Line options={options} data={data} /> <i className={styles.right} />
      </div>
    </div>
  );
};
