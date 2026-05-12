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

export const headerStyle: React.CSSProperties = { marginBottom: "32px" };

export const backBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#6b7280",
  fontSize: "0.85rem",
  cursor: "pointer",
  padding: "0 0 10px",
  fontFamily: "inherit",
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

export const filterButtonsStyle: React.CSSProperties = { display: "flex", gap: "8px", flexWrap: "wrap" };

export const filterBtnBase: React.CSSProperties = {
  padding: "8px 16px",
  border: "1px solid",
  borderRadius: "20px",
  fontSize: "0.82rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.15s ease",
  fontFamily: "inherit",
};

export const dividerStyle: React.CSSProperties = { height: "1px", background: "#f3f4f6", marginBottom: "28px" };

export const emptyStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "60px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
};

export const goBackBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "0.88rem",
  fontWeight: 600,
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

export const viewBtnStyle: React.CSSProperties = {
  marginTop: "6px",
  padding: "10px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "0.88rem",
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
};

export const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  direction: "rtl",
};

export const modalStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "32px",
  width: "100%",
  maxWidth: "580px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
};

export const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

export const modalTitleStyle: React.CSSProperties = { margin: 0, fontSize: "1.2rem", fontWeight: 700 };

export const modalCloseStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#9ca3af",
  lineHeight: 1,
};

export const modalDescStyle: React.CSSProperties = { margin: 0, fontSize: "0.88rem", color: "#6b7280" };

export const modalDividerStyle: React.CSSProperties = { height: "1px", background: "#f3f4f6", margin: "16px 0" };

export const subTasksHeadingStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#374151",
  margin: "0 0 12px",
};

export const subTasksListStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "8px" };

export const subTaskRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px",
  background: "#fafafa",
  borderRadius: "8px",
  flexWrap: "wrap",
};

export const subTaskTitleStyle: React.CSSProperties = { margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#374151" };
export const subTaskDescStyle: React.CSSProperties = { margin: "2px 0 0", fontSize: "0.78rem", color: "#9ca3af" };

export const statusBtnsStyle: React.CSSProperties = { display: "flex", gap: "6px" };

export const statusBtnBase: React.CSSProperties = {
  padding: "5px 12px",
  border: "1px solid",
  borderRadius: "20px",
  fontSize: "0.78rem",
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all 0.15s ease",
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
  direction: "rtl",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
};

export const toastCloseStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "1.2rem",
  cursor: "pointer",
  padding: "0 4px",
};

