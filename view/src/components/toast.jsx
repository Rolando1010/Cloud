import toast, { Toaster } from 'react-hot-toast';
import styles from "../styles/toast.module.css";

const toastConfig = {
    className: styles.toast,
    duration: 5000,
}

const successToast = message => toast.success(message, toastConfig);

const errorToast = message => toast.error(message, toastConfig);

const ToastContainer = () => <Toaster position="top-left"/>;

export {
    successToast,
    errorToast
}

export default ToastContainer;