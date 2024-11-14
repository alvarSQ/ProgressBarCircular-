export interface IDataLabel {
  name: string;
  quantity: number;
  color: string;
}

export interface IData {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}
