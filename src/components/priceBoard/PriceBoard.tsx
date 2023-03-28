/* eslint-disable no-undef */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";

import styles from "./PriceBoard.module.scss";

const PriceCounter = (): JSX.Element => {
  return (
    <div className={styles.priceCounterContainer}>
      <span className={styles.price}>Цена</span>
      <h1 className={styles.priceDisplay}>4,79</h1>
      <span className={styles.priceDescription}>руб./кВт*ч</span>
      <div className={styles.plan}>
        50 руб./кВт*ч <br /> План
      </div>
    </div>
  );
};

export default PriceCounter;
