interface IActionOpenModal {
  payload: number;
  type: "OPEN_MODAL";
}
interface IActionCloseModal {
  payload?: unknown;
  type: "CLOSE_MODAL";
}
interface IActionUpdateRate {
  payload: number;
  type: "UPDATE_RATE";
}

export interface IRateRecipeModal {
  rate: number;
  modalStatus: boolean;
}
export interface IRateRecipeModalStore {
  closeModal: () => void;
  state: IRateRecipeModal;
  openModal: (rate: number) => void;
  updateRate: (rate: number) => void;
}
export type IAction = IActionUpdateRate|IActionOpenModal|IActionCloseModal;