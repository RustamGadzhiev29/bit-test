/* eslint-disable no-undef */
import React from "react";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useAppSelector } from "../../store/store";

import styles from "./Table.module.scss";

type DataType = {
  currentValue: number;
  prevValue: number;
  change: string;
  timestep: string;
};
const PERCENTAGE_VALUE = 100;

const columns: ColumnsType<DataType> = [
  {
    title: "Время показателя",
    dataIndex: "timestep",
  },
  {
    title: "Текущее значение",
    dataIndex: "currentValue",
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

const DataTable = (): JSX.Element => {
  const data = useAppSelector((state) => state.data.tableValues);

  const modData = data.map((el) => ({
    ...el,
    change: `${(el.change * PERCENTAGE_VALUE).toFixed()} %`,
  }));

  console.log(data);

  return (
    <div className={styles.tableContainer}>
      <Table
        columns={columns}
        dataSource={modData}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default DataTable;
