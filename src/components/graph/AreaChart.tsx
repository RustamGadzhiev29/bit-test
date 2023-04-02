import React from "react";

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
import moment from "moment";
import { Line } from "react-chartjs-2";

import { useAppSelector } from "../../store/store";

import styles from "./AreaChart.module.scss";

export type AreaChartPropsType = {
  isOnDrop?: boolean;
};

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
  events: [],
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      hover: false,
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

export const AreaChart = ({ isOnDrop }: AreaChartPropsType): JSX.Element => {
  const data = useAppSelector((state) => state.data.graphValues);

  const values = {
    labels: data.map((element) => moment(element.timestep).format("DD.MM.YY")),
    datasets: [
      {
        data: data.map((element): number => {
          return element.currentValue;
        }),
        borderColor: "black",
        backgroundColor: "#ffff",
      },
    ],
  };

  return (
    <div
      className={isOnDrop ? `${styles.chartContainer1}` : styles.chartContainer}
    >
      <div className={styles.titleContainer}>
        <div className={styles.title}>Потребление</div>{" "}
      </div>
      <div className={styles.lineContainer}>
        <i className={styles.up} />
        <Line options={options} data={values} /> <i className={styles.right} />
      </div>
    </div>
  );
};
