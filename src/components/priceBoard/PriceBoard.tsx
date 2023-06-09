import React from "react";

import { useAppSelector } from "../../store/store";

import styles from "./PriceBoard.module.scss";

export type PriceBoardPropsType = {
  isOnDrop?: boolean;
};

const PriceBoard = ({ isOnDrop }: PriceBoardPropsType): JSX.Element => {
  const data = useAppSelector((state) => state.data.controlValue);

  return (
    <div
      className={
        isOnDrop
          ? `${styles.dropPriceCounterContainer}`
          : styles.priceCounterContainer
      }
    >
      <span className={styles.price}>Цена</span>
      <h1 className={styles.priceDisplay}>{data?.value.currentValue}</h1>
      <span className={styles.priceDescription}>руб./кВт*ч</span>
      <div className={styles.plan}>
        50 руб./кВт*ч <br /> План
      </div>
    </div>
  );
};

export default PriceBoard;
