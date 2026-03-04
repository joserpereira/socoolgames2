import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

class toastComponent {
    error(message: string): void {
        toast.error(
            message,
            {
              rtl: false,
              //limit: 3,
              position: toast.POSITION.BOTTOM_RIGHT,
            },
          );
    }
    info(message: string): void {
        toast.info(
            message,
            {
              rtl: false,
              //limit: 3,
              position: toast.POSITION.BOTTOM_RIGHT,
            },
          );
    }
    warn(message: string): void {
        toast.warn(
            message,
            {
              rtl: false,
              //limit: 3,
              position: toast.POSITION.BOTTOM_RIGHT,
            },
          );
    }

}

export default toastComponent;