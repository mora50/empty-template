import { toast } from "react-toastify";

type THEME_TOAST = "error" | "success" | "info" | "warning" | "black";

export default function notification(message: string, theme: THEME_TOAST) {
  const dismissAll = () => toast.dismiss();

  dismissAll();

  toast[theme](message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    /* toastId: "notification", */
  });
}
