import { createContext, useContext, useState, useRef, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (
    msg: string,
    toastType: ToastType = "success",
    duration = 3000
  ) => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert alert-${type}`}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
