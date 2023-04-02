import React from "react";

import { useAppSelector } from "../../store/store";

import styles from "./Table.module.scss";

export type TablePropsType = {
  isOnDrop?: boolean;
};

const PERCENTAGE_VALUE = 100;

const Table = ({ isOnDrop }: TablePropsType): JSX.Element => {
  const data = useAppSelector((state) => state.data.tableValues);

  const modData = data.map((el) => ({
    ...el,
    change: `${(el.change * PERCENTAGE_VALUE).toFixed()} %`,
  }));

  const tableHeaders = [
    { id: "1th", title: "Время показателя", key: "time" },
    { id: "2th", title: "Текущее значение", key: "current" },
    { id: "3th", title: "Предыдущее значение", key: "prev" },
    { id: "4th", title: "Изменения", key: "change" },
  ];

  return (
    <div
      className={
        isOnDrop ? `${styles.dropTableContainer}` : styles.tableContainer
      }
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map(({ id, title }) => (
              <th key={id}>{title} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modData.map((d) => {
            return (
              <tr key={d.timestep}>
                <td>{d.timestep}</td>
                <td>{d.currentValue}</td>
                <td>{d.prevValue}</td>
                <td>{d.change}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
