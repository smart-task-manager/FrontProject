import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchSubTasks } from "../../store/slices/subTasksSlice";
import { fetchTasks } from "../../store/slices/tasksSlice";
import { fetchUsers } from "../../store/slices/usersSlice";

export default function HistoryTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { subTasks } = useSelector((state: RootState) => state.subTasks);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchSubTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const completedTasks = tasks.filter((t: any) => (t.status ?? t.Status) === 2).length;
  const inProgressTasks = tasks.filter((t: any) => (t.status ?? t.Status) === 1).length;
  const canceledTasks = tasks.filter((t: any) => (t.status ?? t.Status) === 3).length;
  const completedSubTasks = subTasks.filter((s: any) => (s.status ?? s.Status) === 2).length;

  const userStats = users
    .map((u: any) => {
      const userId = u.id || u.Id;
      const userName = u.nameUser || u.NameUser;
      const myTasks = tasks.filter((t: any) => (t.AssignedTo ?? t.assignedTo) === userId);
      const completed = myTasks.filter((t: any) => (t.status ?? t.Status) === 2).length;
      const inProgress = myTasks.filter((t: any) => (t.status ?? t.Status) === 1).length;
      const total = myTasks.length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { userId, userName, total, completed, inProgress, percent };
    })
    .filter((u: any) => u.total > 0);

  const taskStats = tasks
    .map((t: any) => {
      const taskId = t.Id ?? t.id;
      const title = t.Title ?? (t as any).title;
      const mySubTasks = subTasks.filter((s: any) => (s.taskId || s.TaskId) === taskId);
      const completed = mySubTasks.filter((s: any) => (s.status ?? s.Status) === 2).length;
      const total = mySubTasks.length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { taskId, title, total, completed, percent };
    })
    .filter((t: any) => t.total > 0);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">ביצועי עובדים</h2>
      </div>

      <div className="stats-grid">
        {[
          { label: "משימות הושלמו", value: completedTasks },
          { label: "בביצוע", value: inProgressTasks },
          { label: "תתי משימות הושלמו", value: completedSubTasks },
          { label: "בוטלו", value: canceledTasks },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <h3 className="page-title" style={{ marginTop: "32px", marginBottom: "16px" }}>
        ביצועי עובדים
      </h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>עובד</th>
              <th>משימות שלקח</th>
              <th>הושלמו</th>
              <th>בביצוע</th>
              <th>אחוז השלמה</th>
            </tr>
          </thead>
          <tbody>
            {userStats.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  אין נתונים
                </td>
              </tr>
            ) : (
              userStats.map((u: any) => (
                <tr key={u.userId}>
                  <td>{u.userName}</td>
                  <td>{u.total}</td>
                  <td>{u.completed}</td>
                  <td>{u.inProgress}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "100px", height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${u.percent}%`,
                            height: "100%",
                            background: u.percent === 100 ? "#15803d" : "#3b82f6",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <span>{u.percent}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h3 className="page-title" style={{ marginTop: "32px", marginBottom: "16px" }}>
        התקדמות משימות
      </h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>משימה</th>
              <th>סה"כ תתי משימות</th>
              <th>הושלמו</th>
              <th>אחוז התקדמות</th>
            </tr>
          </thead>
          <tbody>
            {taskStats.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  אין נתונים
                </td>
              </tr>
            ) : (
              taskStats.map((t: any) => (
                <tr key={t.taskId}>
                  <td>{t.title}</td>
                  <td>{t.total}</td>
                  <td>{t.completed}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "100px", height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${t.percent}%`,
                            height: "100%",
                            background: t.percent === 100 ? "#15803d" : "#3b82f6",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <span>{t.percent}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
