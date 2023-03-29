export type ControlValueType = {
  value: {
    currentValue: number;
    minValue: number;
    maxValue: number;
  };
};
export type TableValueType = {
  currentValue: number;
  prevValue: number;
  change: number;
  timestep: string;
};

export type GraphValueType = {
  currentValue: number;
  timestep: string;
};

export type DataType = {
  controlValue: ControlValueType | null;
  tableValues: Array<TableValueType>;
  graphValues: Array<GraphValueType>;
};
