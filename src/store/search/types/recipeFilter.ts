interface IActionChangePage {
  payload: number;
  type: "CHANGE_PAGE";
}
interface IActionChangeType {
  payload: string;
  type: "CHANGE_TYPE";
}
interface IActionChangeRate {
  payload: number[];
  type: "CHANGE_RATE";
}
interface IActionChangeTitle {
  payload: string;
  type: "CHANGE_TITLE";
}
export interface IRecipeFilters {
  type: string;
  page: number;
  title: string;
  rate: number[];
  authorLogin: string;
  [key: string]: string|number|number[];
}
interface IActionSetRecipeFilters {
  type: "SET_FILTERS";
  payload: IRecipeFilters;
}
interface IActionChangeAuthorLogin {
  payload: string;
  type: "CHANGE_AUTHOR_LOGIN";
}
export interface IRecipeFiltersStore {
  state: IRecipeFilters;
  changePage: (page: number) => void;
  changeType: (type: string) => void;
  changeTitle: (title: string) => void;
  changeRate: (rate: number[]) => void;
  setFilters: (filters: IRecipeFilters) => void;
  changeAuthorLogin: (authorLogin: string) => void;
}
export type IAction = IActionChangeTitle|IActionChangeAuthorLogin|IActionSetRecipeFilters|IActionChangePage|IActionChangeType|IActionChangeRate;