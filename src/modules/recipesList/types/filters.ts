export interface IFilter {
  page: number;
  title: string;
  typeId: string;
  authorLogin: string;
  recipesIds: string[];
  rate: [number, number];
}