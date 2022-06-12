import { useEffect } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";


const UseNetwork = () => {

  const toastData: ToastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
  };
  
  useEffect(() => {
    const handleOnline = () => {
      toast.success("Internet connection restored", toastData);
    };

    const handleOffline = () => {
      toast.warn("Internet connection down", toastData);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
};
export default UseNetwork;
