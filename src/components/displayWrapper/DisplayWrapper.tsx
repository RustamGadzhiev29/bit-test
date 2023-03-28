/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-useless-fragment */

import { DisplayBlockType } from "../../pages/content/Content";

import styles from "./DisplayWrapper.module.scss";

export type DisplayWrapperPropsType = {
  usedElements: DisplayBlockType[] | [];
  setCurrentItems: (currentItems: number | null) => void;
  arrForRender: DisplayBlockType[] | [];
}

const DisplayWrapper = ({
  setCurrentItems,
  usedElements,
  arrForRender,
}: DisplayWrapperPropsType): JSX.Element => {
  const dragStartHandler = (id: number): void => {
    setCurrentItems(id);
  };

  return (
    <>
      {arrForRender.length !== 3 && (
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
