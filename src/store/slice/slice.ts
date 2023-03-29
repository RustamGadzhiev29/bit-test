import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import dataApi from "../../api/api";
import { AppRootStateType, TypedDispatch } from "../store";
import {
  TableValueType,
  ControlValueType,
  DataType,
  GraphValueType,
} from "../types/types";

const initialState: DataType = {
  controlValue: null,
  tableValues: [],
  graphValues: [],
};

const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    GetControlValue(state, action: PayloadAction<{ data: ControlValueType }>) {
      state.controlValue = action.payload.data;
    },
    GetGraphValues(
      state,
      action: PayloadAction<{ data: Array<GraphValueType> }>
    ) {
      state.graphValues = action.payload.data;
    },
    GetTableValues(
      state,
      action: PayloadAction<{ data: Array<TableValueType> }>
    ) {
      // state.tableValues = action.payload.data.map((el) => ({
      //   ...el,
      //   change: el.change * 100,
      // }));
      state.tableValues = action.payload.data;
    },
  },
});

export const dataReducer = slice.reducer;
export const { GetControlValue, GetGraphValues, GetTableValues } =
  slice.actions;

export const setGraphValuesTC = () => {
  return (dispatch: TypedDispatch<AppRootStateType>) => {
    dataApi.getGraphValues().then((res) => {
      dispatch(GetGraphValues({ data: res }));
    });
  };
};
export const setTableValuesTC = () => {
  return (dispatch: TypedDispatch<AppRootStateType>) => {
    dataApi.getTableValues().then((res) => {
      dispatch(GetTableValues({ data: res }));
    });
  };
};
export const setControlValueTC = () => {
  return (dispatch: TypedDispatch<AppRootStateType>) => {
    dataApi.getControlValue().then((res) => {
      dispatch(GetControlValue({ data: res }));
    });
  };
};
