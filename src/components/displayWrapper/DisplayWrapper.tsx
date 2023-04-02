import { DisplayBlockType } from "../../pages/content/Content";

import styles from "./DisplayWrapper.module.scss";

export type DisplayWrapperPropsType = {
  usedElements: DisplayBlockType[] | [];
  setCurrentItemId: (id: number | null) => void;
};

const DisplayWrapper = ({
  setCurrentItemId,
  usedElements,
}: DisplayWrapperPropsType): JSX.Element => {
  const dragStartHandler = (id: number): void => {
    setCurrentItemId(id);
  };

  return (
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
  );
};

export default DisplayWrapper;
