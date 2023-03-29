import { GraphValueType, ControlValueType } from "../store/types/types";

import { instance } from "./config/index";

const dataApi = {
  async getControlValue() {
    const response = await instance.get<ControlValueType>(`/controlValue`);

    return response.data;
  },
  async getGraphValues() {
    const response = await instance.get<Array<GraphValueType>>(`/graphValues`);

    return response.data;
  },
  async getTableValues() {
    const response = await instance.get(`/tableValues`);

    return response.data;
  },
};

export default dataApi;
