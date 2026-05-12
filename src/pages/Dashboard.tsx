import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import { fetchTasks, updateTask } from "../store/slices/tasksSlice";
import type { Task } from "../types";
import { logout } from "../store/slices/authSlice";
import SuccessToast from "../components/dashboard/SuccessToast";
import TaskCard from "../components/dashboard/TaskCard";
import {
  badgeCountStyle,
  centerStyle,
  containerStyle,
  dividerStyle,
  emptyStyle,
  filtersRow,
  gridStyle,
  h1Style,
  headerStyle,
  logoutBtnStyle,
  myTasksBtnStyle,
  searchStyle,
  spinnerStyle,
  subtitleStyle,
} from "../components/dashboard/styles";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [takenIds, setTakenIds] = useState<Set<number>>(new Set());
  const handleLogout = () => {
  dispatch(logout());
  navigate('/login');
};

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const handleTakeTask = async (task: Task) => {
    if (!user) {
      alert('עליך להתחבר כדי לקחת משימה');
      return;
    }
    const updatedTask: Task = {
      ...task,
      AssignedTo: (user as any).id || (user as any).Id,  
      Status: 1, // 1 = InProgress
    };
    await dispatch(updateTask(updatedTask));
    await dispatch(fetchTasks());  
    setTakenIds(prev => new Set(prev).add(task.Id));
    setSuccessMsg(`המשימה "${task.Title}" נלקחה בהצלחה!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // משימות פנויות — רק ממתינות (Status=0) וללא אחראי
  const availableTasks = tasks
  .filter(t => {
    const isUnassigned = t.AssignedTo === null || t.AssignedTo === undefined;
    const isPending = t.Status === 0;
    const notJustTaken = !takenIds.has(t.Id);
    return isUnassigned && isPending && notJustTaken;
  })
  .filter(t =>
    t.Title?.toLowerCase().includes(search.toLowerCase()) ||
    t.Description?.toLowerCase().includes(search.toLowerCase())
  );

  // המשימות שהיוזר כבר לקח
  const myTasksCount = user ? tasks.filter(t => t.AssignedTo === user.Id).length : 0;

  if (loading) return (
    <div style={centerStyle}>
      <div style={spinnerStyle} />
      <p style={{ color: "#6b7280", marginTop: "16px", fontSize: "0.9rem" }}>טוען משימות...</p>
    </div>
  );

  if (error) return (
    <div style={centerStyle}>
      <p style={{ color: "#ef4444", fontSize: "0.95rem" }}>שגיאה: {error}</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Toast */}
      {successMsg && (
        <SuccessToast message={successMsg} onClose={() => setSuccessMsg(null)} />
      )}

      {/* Header */}
      <header style={headerStyle}>
        <div>
          <h1 style={h1Style}>לוח משימות</h1>
          {user && (
            <p style={subtitleStyle}>
              שלום, <strong>{user.NameUser}</strong> — {availableTasks.length} משימות פנויות
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {user && (
            <button onClick={() => navigate("/my-tasks")} style={myTasksBtnStyle}>
              המשימות שלי
              {myTasksCount > 0 && <span style={badgeCountStyle}>{myTasksCount}</span>}
            </button>
          )}
          <button onClick={handleLogout} style={logoutBtnStyle}>
            🚪 התנתק
          </button>
        </div>
      </header>

      {/* Filters */}
      <div style={filtersRow}>
        <input
          type="text"
          placeholder="חיפוש משימה..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchStyle}
        />
      </div>

      {/* Divider */}
      <div style={dividerStyle} />

      {/* Grid */}
      {availableTasks.length === 0 ? (
        <div style={emptyStyle}>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>אין משימות התואמות לחיפוש</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {availableTasks.map((task) => (
            <TaskCard key={task.Id} task={task} taken={takenIds.has(task.Id)} onTake={handleTakeTask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
