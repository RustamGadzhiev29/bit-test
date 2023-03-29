/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState } from "react";

import gear from "../../common/assets/images/gear.svg";
import DisplayWrapper from "../../components/displayWrapper/DisplayWrapper";
import { AreaChart } from "../../components/graph/AreaChart";
import PriceBoard from "../../components/priceBoard/PriceBoard";
import DataTable from "../../components/table/Table";
import { insertByIndex } from "../../helpers/helpers";

import styles from "./Content.module.scss";

export type DisplayBlockType = {
  id: number;
  elem: () => JSX.Element;
  use: boolean;
};

const Content: FC = () => {
  // console.log("content");

  const [isOpen, setIsOpen] = useState(false);

  const [currentItems, setCurrentItems] = useState<null | number>(null);
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
      elem: DataTable,
      use: false,
    },
  ]);

  const [dropItem, setDropItem] = useState<number | null>(null);
  const [startItem, setStartItem] = useState<number | null>(null);
  const [backDropZone, setBackDropZone] = useState<boolean>(false);
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setBackDropZone(false);

    if (
      arrForRender.every((item: DisplayBlockType) => item.id !== currentItems)
    ) {
      for (let i = 0; i < usedElements.length; i += 1) {
        if (arrForRender.length === 0) {
          setArrForRender(
            usedElements.filter(
              (elem: DisplayBlockType) => elem.id === currentItems
            )
          );
        }
        if (usedElements[i].id === currentItems) {
          if (currentItems === 1) {
            setArrForRender((prev: DisplayBlockType[] | []) => [
              usedElements[i],
              ...prev,
            ]);
          } else {
            dropItem
              ? setArrForRender((prev: DisplayBlockType[] | []) =>
                  insertByIndex(prev, dropItem, usedElements[i])
                )
              : setArrForRender((prev: DisplayBlockType[] | []) => [
                  ...prev,
                  usedElements[i],
                ]);
          }

          const newArr = [...usedElements];
          const index = newArr.findIndex(
            (obj: DisplayBlockType) => obj.id === currentItems
          );

          newArr[index].use = true;
          setUsedElements(newArr);
        }
      }
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setBackDropZone(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setBackDropZone(false);
  };

  const dragStartHandlerItem = (id: number): void => {
    setStartItem(id);
  };
  const onDropHandlerItem = (item: DisplayBlockType): void => {
    if (startItem === 1) return;
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
    console.log(dropItem);
  };

  // const calculatorWrapperStyle = () => {
  //   if (arrForRender.length !== 0) return "nonempty";
  //   if (backDropZone) return "active";
  // };

  const handleDoubleClick = (id: number): void => {
    setArrForRender(arrForRender.filter((elem) => elem.id !== id));
    const newArr = [...usedElements];
    const index = newArr.findIndex((obj: DisplayBlockType) => obj.id === id);

    newArr[index].use = false;
    setUsedElements(newArr);
  };

  return (
    <div
      className={styles.container}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
    >
      <div className={styles.contentContainer}>
        <div className={styles.button}>
          <img
            onClick={() => setIsOpen(true)}
            className={styles.buttonIcon}
            src={gear}
            alt="logo"
          />
        </div>
        <div className={styles.content}>
          {isOpen && (
            <DisplayWrapper
              usedElements={usedElements}
              setCurrentItems={setCurrentItems}
              arrForRender={arrForRender}
            />
          )}
          {arrForRender.map((item: DisplayBlockType) => {
            const Component = item.elem;

            return (
              <div
                key={item.id}
                draggable={!(item.id === 1)}
                onDragOver={(e) => dragOverHandlerItem(e, item)}
                onDrop={() => onDropHandlerItem(item)}
                onDragStart={() => dragStartHandlerItem(item.id)}
                onDragLeave={(e) => dragLeaveHandlerItem(e)}
                onDragEnd={() => dragEndHandlerItem()}
                onDoubleClick={() => handleDoubleClick(item.id)}
              >
                <Component />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
