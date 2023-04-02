import { DisplayBlockType } from "../pages/content/Content";

export function insertByIndex(
  array: DisplayBlockType[],
  index: number,
  element: DisplayBlockType
): DisplayBlockType[] {
  return [...array.slice(0, index), element, ...array.slice(index)];
}
