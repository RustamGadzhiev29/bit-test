/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-useless-fragment */

import { useEffect } from "react";

import { DisplayBlockType } from "../../pages/content/Content";
import {
  setControlValueTC,
  setGraphValuesTC,
  setTableValuesTC,
} from "../../store/slice/slice";
import { useTypedDispatch } from "../../store/store";

import styles from "./DisplayWrapper.module.scss";

export type DisplayWrapperPropsType = {
  usedElements: DisplayBlockType[] | [];
  setCurrentItems: (currentItems: number | null) => void;
  arrForRender: DisplayBlockType[] | [];
};

const MINUTE_INTERVAL_VALUE = 60000;
const FIVESEC_INTERVAL_VALUE = 5000;
const LENGTH_VALUE = 3;

const DisplayWrapper = ({
  setCurrentItems,
  usedElements,
  arrForRender,
}: DisplayWrapperPropsType): JSX.Element => {
  const dragStartHandler = (id: number): void => {
    setCurrentItems(id);
  };
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const graphValuesTimer = setInterval(
      () => dispatch(setGraphValuesTC()),
      FIVESEC_INTERVAL_VALUE
    );
    const tableValuesTimer = setInterval(
      () => dispatch(setTableValuesTC()),
      MINUTE_INTERVAL_VALUE
    );

    const controlValueTimer = setInterval(
      () => dispatch(setControlValueTC()),
      MINUTE_INTERVAL_VALUE
    );

    dispatch(setGraphValuesTC());
    dispatch(setTableValuesTC());
    dispatch(setControlValueTC());

    return () => {
      clearInterval(graphValuesTimer);
      clearInterval(tableValuesTimer);
      clearInterval(controlValueTimer);
    };
  }, []);

  return (
    <>
      {arrForRender.length !== LENGTH_VALUE && (
        <div className={styles.displayContainer}>
          {usedElements.map((item: DisplayBlockType) => {
            const Component = item.elem;

            return (
              <div
                key={item.id}
                draggable={!item.use}
                onDragStart={() => dragStartHandler(item.id)}
              >
                <div style={item.use ? { opacity: 0.5 } : { opacity: 1 }}>
                  <Component />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DisplayWrapper;
