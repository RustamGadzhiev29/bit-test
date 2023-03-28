/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DisplayBlockType } from "../pages/content/Content";

export function insertByIndex(
  array: DisplayBlockType[],
  index: number,
  element: DisplayBlockType
) {
  return [...array.slice(0, index), element, ...array.slice(index)];
}
