import type { Task } from "../../types";
import { badgeStyle, cardDescStyle, cardStyle, cardTitleStyle, statusConfig, takeButtonStyle } from "./styles";

export default function TaskCard({
  task,
  taken,
  onTake,
}: {
  task: Task;
  taken: boolean;
  onTake: (task: Task) => void;
}) {
  const status = statusConfig[task.Status] ?? { label: String(task.Status), color: "#374151", bg: "#f3f4f6" };

  return (
    <div style={{ ...cardStyle, opacity: taken ? 0.5 : 1 }}>
      <span style={{ ...badgeStyle, color: status.color, background: status.bg }}>{status.label}</span>
      <h3 style={cardTitleStyle}>{task.Title}</h3>
      <p style={cardDescStyle}>{task.Description || "אין תיאור"}</p>
      <button
        onClick={() => onTake(task)}
        disabled={taken}
        style={{ ...takeButtonStyle, opacity: taken ? 0.4 : 1, cursor: taken ? "default" : "pointer" }}
      >
        {taken ? "✓ נלקחה" : "קח משימה"}
      </button>
    </div>
  );
}
