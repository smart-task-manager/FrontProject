import { toastCloseStyle, toastStyle } from "./styles";

export default function SuccessToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div style={toastStyle}>
      <span>✓</span>
      <span>{message}</span>
      <button onClick={onClose} style={toastCloseStyle}>
        ×
      </button>
    </div>
  );
}

