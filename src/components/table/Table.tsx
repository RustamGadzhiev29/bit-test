/* eslint-disable no-undef */
import React from "react";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import styles from "./Table.module.scss";

interface DataType {
  currentValue: number;
  prevValue: number;
  change: number;
  timestep: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Время показателя",
    dataIndex: "timestep",
  },
  {
    title: "Текущее значение",
    dataIndex: "prevValue",
  },
  {
    title: "Предыдущее значение",
    dataIndex: "prevValue",
  },
  {
    title: "Изменения",
    dataIndex: "change",
  },
];

const data: DataType[] = [
  {
    currentValue: 201,
    prevValue: 213,
    change: -0.06,
    timestep: "21.03.2023 11:02",
  },
  {
    currentValue: 222,
    prevValue: 228,
    change: -0.03,
    timestep: "21.03.2023 11:07",
  },
  {
    currentValue: 152,
    prevValue: 161,
    change: -0.06,
    timestep: "21.03.2023 11:12",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
  {
    currentValue: 260,
    prevValue: 242,
    change: 0.07,
    timestep: "21.03.2023 11:17",
  },
];

const DataTable = (): JSX.Element => (
  <div className={styles.tableContainer}>
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    />
  </div>
);

export default DataTable;
