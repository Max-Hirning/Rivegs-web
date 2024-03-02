interface IActionOpenModal {
  payload: string;
  type: "OPEN_MODAL";
}
interface IActionCloseModal {
  payload?: unknown;
  type: "CLOSE_MODAL";
}

export interface IDeleteRecipeModal {
  id: string|null;
  modalStatus: boolean;
}
export interface IDeleteRecipeModalStore {
  closeModal: () => void;
  state: IDeleteRecipeModal;
  openModal: (id: string) => void;
}
export type IAction = IActionOpenModal|IActionCloseModal;