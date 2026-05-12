import type { Task } from "../../types";
import { badgeStyle, cardDescStyle, cardStyle, cardTitleStyle, statusConfig, viewBtnStyle } from "./styles";

export default function TaskCard({ task, onOpen }: { task: Task; onOpen: (task: Task) => void }) {
  const status = statusConfig[task.Status] ?? { label: String(task.Status), color: "#374151", bg: "#f3f4f6" };
  return (
    <div style={cardStyle}>
      <span style={{ ...badgeStyle, color: status.color, background: status.bg }}>{status.label}</span>
      <h3 style={cardTitleStyle}>{task.Title}</h3>
      <p style={cardDescStyle}>{task.Description || "אין תיאור"}</p>
      <button onClick={() => onOpen(task)} style={viewBtnStyle}>
        תתי משימות ▾
      </button>
    </div>
  );
}

