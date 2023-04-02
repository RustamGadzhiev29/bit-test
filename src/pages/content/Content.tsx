import React, { FC, useEffect, useState } from "react";

import { ReactComponent as Gear } from "../../common/assets/images/gear.svg";
import DisplayWrapper from "../../components/displayWrapper/DisplayWrapper";
import { AreaChart } from "../../components/graph/AreaChart";
import PriceBoard from "../../components/priceBoard/PriceBoard";
import Table from "../../components/table/Table";
import { insertByIndex } from "../../helpers/helpers";
import {
  setControlValueTC,
  setGraphValuesTC,
  setTableValuesTC,
} from "../../store/slice/slice";
import { useTypedDispatch } from "../../store/store";

import styles from "./Content.module.scss";

export type OnDropPropsType = {
  isOnDrop?: boolean;
};

export type DisplayBlockType = {
  id: number;
  elem: ({ isOnDrop }: OnDropPropsType) => JSX.Element;
  use: boolean;
};

const LENGTH_VALUE = 3;
const MINUTE_INTERVAL_VALUE = 60000;
const FIVESEC_INTERVAL_VALUE = 5000;

const Content: FC = () => {
  // console.log("content");

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<null | number>(null);
  const [arrForRender, setArrForRender] = useState<DisplayBlockType[] | []>([]);
  const [usedElements, setUsedElements] = useState<DisplayBlockType[]>([
    {
      id: 1,
      elem: PriceBoard,
      use: false,
    },
    {
      id: 2,
      elem: AreaChart,
      use: false,
    },
    {
      id: 3,
      elem: Table,
      use: false,
    },
  ]);

  const [dropItem, setDropItem] = useState<number | null>(null);
  const [startItem, setStartItem] = useState<number | null>(null);
  const [isOnDrop, setOnDrop] = useState<boolean>(false);

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

  const onGearBtn = (): void => {
    setIsActive(!isActive);
    setIsOpen(!isOpen);
  };

  console.log(arrForRender);

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOnDrop(true);
    if (
      arrForRender.every((item: DisplayBlockType) => item.id !== currentItemId)
    ) {
      for (let i = 0; i < usedElements.length; i += 1) {
        if (arrForRender.length === 0) {
          setArrForRender(
            usedElements.filter(
              (elem: DisplayBlockType) => elem.id === currentItemId
            )
          );
        }
        if (usedElements[i].id === currentItemId) {
          if (dropItem) {
            setArrForRender((prev: DisplayBlockType[] | []) =>
              insertByIndex(prev, dropItem, usedElements[i])
            );
          } else
            setArrForRender((prev: DisplayBlockType[] | []) => [
              ...prev,
              usedElements[i],
            ]);

          const newArr = [...usedElements];
          const index = newArr.findIndex(
            (obj: DisplayBlockType) => obj.id === currentItemId
          );

          newArr[index].use = true;
          setUsedElements(newArr);
        }
      }
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const dragStartHandlerItem = (id: number): void => {
    setStartItem(id);
  };
  const onDropHandlerItem = (item: DisplayBlockType): void => {
    if (item.id === startItem) return;

    const indexToRemove = arrForRender.findIndex(
      (elem: DisplayBlockType) => elem.id === startItem
    );
    const indexToInsertAfter = arrForRender.findIndex(
      (elem: DisplayBlockType) => elem.id === item.id
    );

    const removedElement = arrForRender.find((elem) => elem.id === startItem);
    const newArr = arrForRender.filter((elem) => elem.id !== startItem);

    if (removedElement) {
      if (indexToRemove < indexToInsertAfter) {
        setArrForRender(
          insertByIndex(newArr, indexToInsertAfter, removedElement)
        );
      } else {
        setArrForRender(
          insertByIndex(newArr, indexToInsertAfter + 1, removedElement)
        );
      }
    }
    setDropItem(null);
  };
  const dragLeaveHandlerItem = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDropItem(null);
  };
  const dragEndHandlerItem = (): void => {
    setDropItem(null);
  };
  const dragOverHandlerItem = (
    e: React.DragEvent<HTMLDivElement>,
    item: DisplayBlockType
  ): void => {
    e.preventDefault();
    setDropItem(item.id);
  };

  const handleDoubleClick = (id: number): void => {
    setArrForRender(arrForRender.filter((elem) => elem.id !== id));
    const newArr = [...usedElements];
    const index = newArr.findIndex((obj: DisplayBlockType) => obj.id === id);

    newArr[index].use = false;
    setUsedElements(newArr);
  };

  console.log(currentItemId);

  return (
    <div
      className={styles.contentContainer}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
    >
      <div className={styles.button}>
        <Gear
          className={
            isActive
              ? `${styles.buttonIcon} ${styles.active}`
              : styles.buttonIcon
          }
          onClick={onGearBtn}
        />
      </div>
      <div className={styles.content}>
        {isOpen && arrForRender.length !== LENGTH_VALUE && (
          <DisplayWrapper
            usedElements={usedElements}
            setCurrentItemId={setCurrentItemId}
          />
        )}
        {arrForRender.map((item: DisplayBlockType) => {
          const Component = item.elem;

          return (
            <div
              className={styles.gridItem}
              key={item.id}
              draggable
              onDragOver={(e) => dragOverHandlerItem(e, item)}
              onDrop={() => onDropHandlerItem(item)}
              onDragStart={() => dragStartHandlerItem(item.id)}
              onDragLeave={(e) => dragLeaveHandlerItem(e)}
              onDragEnd={() => dragEndHandlerItem()}
              onDoubleClick={() => handleDoubleClick(item.id)}
            >
              <Component isOnDrop={isOnDrop} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
