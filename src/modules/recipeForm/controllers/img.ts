import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function isImgHorisontal(selectedFile: File, callBack: (url: string) => void): void {
  const img = new Image();
  img.src = URL.createObjectURL(selectedFile);

  img.onload = () => {
    const width = img.width;
    const height = img.height;

    if (!(height > width)) {
      callBack(URL.createObjectURL(selectedFile));
    } else {
      ToastifyCaller(IStatuses.warning, "Please, don't choose vertical images");
    }
  };
}