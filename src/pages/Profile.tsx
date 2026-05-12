import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import type { RootState } from "../store";

function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div style={styles.wrapper}>
        <section style={styles.card}>
          <h1 style={styles.title}>פרופיל משתמש</h1>
          <p style={styles.muted}>לא נמצאו פרטי משתמש מחובר.</p>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            מעבר להתחברות
          </button>
        </section>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <section style={styles.card}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>פרטי חשבון</p>
            <h1 style={styles.title}>{user.NameUser}</h1>
          </div>
          <span className={`badge ${user.role === "admin" ? "badge-high" : "badge-open"}`}>
            {user.role === "admin" ? "מנהל" : "משתמש"}
          </span>
        </div>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span style={styles.label}>שם משתמש</span>
            <strong>{user.NameUser}</strong>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>אימייל</span>
            <strong dir="ltr">{user.Email}</strong>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>סוג הרשאה</span>
            <strong>{user.role === "admin" ? "מנהל מערכת" : "משתמש רגיל"}</strong>
          </div>
        </div>

        <div style={styles.actions}>
          <button className="btn btn-outline" onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}>
            חזרה למסך הראשי
          </button>
          {user.role !== "admin" && (
            <button className="btn btn-primary" onClick={() => navigate("/my-tasks")}>
              המשימות שלי
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#f3f4f6",
    direction: "rtl",
  },
  card: {
    width: "100%",
    maxWidth: "680px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    padding: "28px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  eyebrow: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
  },
  title: {
    margin: "4px 0 0",
    color: "#111827",
    fontSize: "26px",
  },
  muted: {
    color: "#6b7280",
    marginBottom: "20px",
  },
  details: {
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "16px 0",
    borderBottom: "1px solid #f3f4f6",
  },
  label: {
    color: "#6b7280",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },
};

export default Profile;
