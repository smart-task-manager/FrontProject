import { toastCloseStyle, toastStyle } from "./styles";

export default function SuccessToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div style={toastStyle}>
      <span style={{ fontSize: "1.1rem" }}>✓</span>
      <span>{message}</span>
      <button onClick={onClose} style={toastCloseStyle}>
        ×
      </button>
    </div>
  );
}
