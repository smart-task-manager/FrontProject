import React, { createContext, useContext, useState } from "react";
import type { ToastType } from "./toastTypes";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

const ToastContext = createContext<{
  notify: (message: string, type?: ToastType, duration?: number) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  };

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 16,
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    zIndex: 9999,
  };

  const toastStyle = (type: ToastType): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 8,
    color: "#fff",
    background: type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
    minWidth: 220,
    maxWidth: 320,
    fontSize: 14,
  });

  const closeStyle: React.CSSProperties = {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div style={containerStyle} aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} style={toastStyle(toast.type)}>
            <span>{toast.message}</span>
            <button
              type="button"
              style={closeStyle}
              onClick={() => dismiss(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
