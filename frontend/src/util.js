import { toast } from "react-toastify";

export const handelSuccess = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
  });
};

export const handelError = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
  });
};
