import { toast, ToastOptions, Id } from 'react-toastify';

const DEFAULT_OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export class KindercareToast {
  public static success(message: string, options?: ToastOptions): Id {
    return toast.success(message, { ...DEFAULT_OPTIONS, ...options });
  }

  public static error(message: string, options?: ToastOptions): Id {
    return toast.error(message, { ...DEFAULT_OPTIONS, ...options });
  }

  public static warn(message: string, options?: ToastOptions): Id {
    return toast.warn(message, { ...DEFAULT_OPTIONS, ...options });
  }

  public static info(message: string, options?: ToastOptions): Id {
    return toast.info(message, { ...DEFAULT_OPTIONS, ...options });
  }

  public static loading(message: string, options?: ToastOptions): Id {
    return toast.loading(message, { ...DEFAULT_OPTIONS, ...options });
  }

  public static dismiss(id?: Id): void {
    toast.dismiss(id);
  }
}
