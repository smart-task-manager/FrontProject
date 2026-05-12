import type React from "react";

export const statusConfig: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: "ממתין", color: "#b45309", bg: "#fef3c7" },
  1: { label: "בביצוע", color: "#1d4ed8", bg: "#dbeafe" },
  2: { label: "הושלם", color: "#15803d", bg: "#dcfce7" },
  3: { label: "בוטל", color: "#b91c1c", bg: "#fee2e2" },
};

export const containerStyle: React.CSSProperties = {
  direction: "rtl",
  fontFamily: "'Heebo', 'Segoe UI', sans-serif",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "48px 32px",
  minHeight: "100vh",
  background: "#fafafa",
  color: "#111",
  position: "relative",
};

export const centerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  direction: "rtl",
};

export const spinnerStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  border: "2px solid #e5e7eb",
  borderTop: "2px solid #111",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

export const headerStyle: React.CSSProperties = {
  marginBottom: "32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

export const h1Style: React.CSSProperties = {
  fontSize: "1.75rem",
  fontWeight: 700,
  margin: 0,
  letterSpacing: "-0.5px",
  color: "#111",
};

export const subtitleStyle: React.CSSProperties = {
  margin: "6px 0 0",
  fontSize: "0.9rem",
  color: "#6b7280",
};

export const filtersRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: "20px",
};

export const searchStyle: React.CSSProperties = {
  flex: "1",
  minWidth: "200px",
  padding: "10px 14px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "0.9rem",
  background: "#fff",
  outline: "none",
  direction: "rtl",
  color: "#111",
};

export const dividerStyle: React.CSSProperties = {
  height: "1px",
  background: "#f3f4f6",
  marginBottom: "28px",
};

export const emptyStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "60px 0",
};

export const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
  gap: "16px",
};

export const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #f0f0f0",
  borderRadius: "12px",
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  transition: "box-shadow 0.2s ease",
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
};

export const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 600,
  width: "fit-content",
};

export const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 700,
  color: "#111",
  lineHeight: 1.4,
};

export const cardDescStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "0.85rem",
  color: "#6b7280",
  lineHeight: 1.6,
  flexGrow: 1,
};

export const takeButtonStyle: React.CSSProperties = {
  marginTop: "6px",
  padding: "10px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "0.88rem",
  fontWeight: 600,
  fontFamily: "inherit",
  transition: "background 0.15s ease",
};

export const toastStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "28px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#111",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "0.9rem",
  fontWeight: 500,
  zIndex: 1000,
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  direction: "rtl",
};

export const toastCloseStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "1.2rem",
  cursor: "pointer",
  lineHeight: 1,
  padding: "0 4px",
};

export const myTasksBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#fff",
  color: "#111",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "0.88rem",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "border-color 0.15s ease",
};

export const badgeCountStyle: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  borderRadius: "20px",
  padding: "1px 7px",
  fontSize: "0.75rem",
  fontWeight: 700,
};

export const logoutBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#fff",
  color: "#ef4444",
  border: "1px solid #ef4444",
  borderRadius: "8px",
  fontSize: "0.88rem",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
};

