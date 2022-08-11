export interface IAttributes {
  data: string;
}
export interface IBlock {
  id: number;
  attributes: IAttributes
}
export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  block: IBlock[]
}
