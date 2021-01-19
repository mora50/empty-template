import { toast } from "react-toastify";

export default function notification(message: string, theme: string) {
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
