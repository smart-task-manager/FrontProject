import type { SubTask, Task } from "../../types";
import {
  modalCloseStyle,
  modalDescStyle,
  modalDividerStyle,
  modalHeaderStyle,
  modalStyle,
  modalTitleStyle,
  overlayStyle,
  statusBtnBase,
  statusBtnsStyle,
  subTaskDescStyle,
  subTaskRowStyle,
  subTaskTitleStyle,
  subTasksHeadingStyle,
  subTasksListStyle,
  statusConfig,
} from "./styles";

export default function SubTasksModal({
  task,
  subTasks,
  loading,
  onClose,
  onUpdateStatus,
}: {
  task: Task;
  subTasks: SubTask[];
  loading: boolean;
  onClose: () => void;
  onUpdateStatus: (st: SubTask, status: number) => void;
}) {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>{task.Title}</h2>
          <button onClick={onClose} style={modalCloseStyle}>
            ×
          </button>
        </div>
        <p style={modalDescStyle}>{task.Description || "אין תיאור"}</p>
        <div style={modalDividerStyle} />
        <h3 style={subTasksHeadingStyle}>תתי משימות</h3>
        {loading ? (
          <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>טוען...</p>
        ) : subTasks.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>אין תתי משימות</p>
        ) : (
          <div style={subTasksListStyle}>
            {subTasks.map((st) => (
              <div key={st.Id} style={subTaskRowStyle}>
                <div style={{ flex: 1 }}>
                  <p style={subTaskTitleStyle}>{st.Title || (st as any).title}</p>
                  {(st.Description || (st as any).description) && (
                    <p style={subTaskDescStyle}>{st.Description || (st as any).description}</p>
                  )}
                </div>
                <div style={statusBtnsStyle}>
                  {[
                    { val: 0, label: "ממתין" },
                    { val: 1, label: "בביצוע" },
                    { val: 2, label: "הושלם" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      onClick={() => onUpdateStatus(st, s.val)}
                      style={{
                        ...statusBtnBase,
                        background: (st.Status ?? (st as any).status) === s.val ? statusConfig[s.val].bg : "transparent",
                        color: (st.Status ?? (st as any).status) === s.val ? statusConfig[s.val].color : "#9ca3af",
                        borderColor: (st.Status ?? (st as any).status) === s.val ? statusConfig[s.val].color : "#e5e7eb",
                        fontWeight: (st.Status ?? (st as any).status) === s.val ? 700 : 400,
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
