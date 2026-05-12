import type { CSSProperties } from "react";

type ErrorMessageProps = {
  message: string;
  title?: string;
  compact?: boolean;
};

export default function ErrorMessage({ message, title = "שגיאה", compact = false }: ErrorMessageProps) {
  return (
    <div style={compact ? compactStyle : containerStyle} role="alert">
      <div style={iconStyle}>!</div>
      <div>
        <strong style={titleStyle}>{title}</strong>
        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
}

const containerStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #fecaca",
  background: "#fef2f2",
  color: "#991b1b",
  direction: "rtl",
};

const compactStyle: CSSProperties = {
  ...containerStyle,
  padding: "10px 12px",
  marginBottom: "12px",
};

const iconStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  background: "#dc2626",
  color: "#fff",
  fontWeight: 700,
  flexShrink: 0,
};

const titleStyle: CSSProperties = {
  display: "block",
  fontSize: "13px",
  marginBottom: "2px",
};

const messageStyle: CSSProperties = {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.5,
};
