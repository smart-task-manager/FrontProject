import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { fetchTasks } from '../store/slices/tasksSlice';
import { fetchSubTasks, updateSubTask } from '../store/slices/subTasksSlice';
import type { Task } from '../types';
import ErrorMessage from "../components/ui/ErrorMessage";
import SuccessToast from "../components/my-tasks/SuccessToast";
import SubTasksModal from "../components/my-tasks/SubTasksModal";
import TaskCard from "../components/my-tasks/TaskCard";
import {
  backBtnStyle,
  containerStyle,
  dividerStyle,
  emptyStyle,
  filterBtnBase,
  filterButtonsStyle,
  filtersRow,
  goBackBtnStyle,
  gridStyle,
  h1Style,
  headerStyle,
  searchStyle,
  subtitleStyle,
} from "../components/my-tasks/styles";

// ---- הדף הראשי ----
const MyTasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { tasks, error: tasksError } = useSelector((state: RootState) => state.tasks);
  const { subTasks, loading: subLoading, error: subTasksError } = useSelector((state: RootState) => state.subTasks);
  const { user } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

const handleOpenTask = (task: Task) => {
  setSelectedTask(task);
  dispatch(fetchSubTasks());
};

const handleUpdateSubTaskStatus = async (subTask: any, newStatus: number) => {
  try {
    await dispatch(updateSubTask({
      Id: subTask.id || subTask.Id,
      TaskId: subTask.taskId || subTask.TaskId,
      TaskName: subTask.taskName || subTask.TaskName,
      Title: subTask.title || subTask.Title,
      Description: subTask.description || subTask.Description,
      AssignedTo: subTask.assignedTo || subTask.AssignedTo,
      Status: newStatus,
    } as any)).unwrap();
    await dispatch(fetchTasks());
    setErrorMsg(null);
    setSuccessMsg('הסטטוס עודכן בהצלחה');
    setTimeout(() => setSuccessMsg(null), 3000);
  } catch (err: any) {
    setErrorMsg(typeof err === "string" ? err : "לא הצלחנו לעדכן את סטטוס תת המשימה");
  }
};

const totalMyTasks = user ? tasks.filter(t => t.AssignedTo !== null && t.AssignedTo === ((user as any).id || (user as any).Id)).length : 0;
const myTasks = (user ? tasks.filter(t => t.AssignedTo !== null && t.AssignedTo === user.Id) : [])    .filter(t =>
      t.Title?.toLowerCase().includes(search.toLowerCase()) ||
      t.Description?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => statusFilter === 'all' || t.Status === Number(statusFilter));

const currentSubTasks = selectedTask
  ? subTasks.filter((st: any) => (st.taskId || st.TaskId) === selectedTask.Id)
  : [];

  return (
    <div style={containerStyle}>
      {successMsg && <SuccessToast message={successMsg} onClose={() => setSuccessMsg(null)} />}
      {errorMsg && <ErrorMessage message={errorMsg} title="העדכון נכשל" compact />}
      {tasksError && <ErrorMessage message={tasksError} title="טעינת המשימות נכשלה" compact />}
      {subTasksError && selectedTask && <ErrorMessage message={subTasksError} title="טעינת תתי המשימות נכשלה" compact />}
      {selectedTask && (
        <SubTasksModal
          task={selectedTask}
          subTasks={currentSubTasks}
          loading={subLoading}
          onClose={() => setSelectedTask(null)}
          onUpdateStatus={handleUpdateSubTaskStatus}
        />
      )}

      {/* Header */}
      <header style={headerStyle}>
        <div>
          <button onClick={() => navigate('/dashboard')} style={backBtnStyle}>← חזרה ללוח</button>
          <h1 style={h1Style}>המשימות שלי</h1>
          {user && <p style={subtitleStyle}>{totalMyTasks} משימות פעילות</p>}
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
        <div style={filterButtonsStyle}>
          {[
            { key: 'all', label: 'הכל' },
            { key: '0',   label: 'ממתין' },
            { key: '1',   label: 'בביצוע' },
            { key: '2',   label: 'הושלם' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              style={{
                ...filterBtnBase,
                background: statusFilter === f.key ? '#111' : 'transparent',
                color: statusFilter === f.key ? '#fff' : '#6b7280',
                borderColor: statusFilter === f.key ? '#111' : '#e5e7eb',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Grid */}
      {myTasks.length === 0 ? (
        <div style={emptyStyle}>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            {totalMyTasks === 0 ? 'עדיין לא לקחת משימות' : 'אין משימות התואמות לחיפוש'}
          </p>
          {totalMyTasks === 0 && (
            <button onClick={() => navigate('/dashboard')} style={goBackBtnStyle}>
              עבור ללוח המשימות
            </button>
          )}
        </div>
      ) : (
        <div style={gridStyle}>
          {myTasks.map((task) => (
            <TaskCard key={task.Id} task={task} onOpen={handleOpenTask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
