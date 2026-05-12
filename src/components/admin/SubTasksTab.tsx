import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addSubTask, cancelSubTask, fetchSubTasks, updateSubTask } from "../../store/slices/subTasksSlice";
import { fetchTasks } from "../../store/slices/tasksSlice";
import { fetchUsers } from "../../store/slices/usersSlice";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "./utils";

function SubTaskForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (subTask: any) => void;
  onCancel: () => void;
  initialData?: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const [title, setTitle] = useState(initialData?.title || initialData?.Title || "");
  const [description, setDescription] = useState(initialData?.description || initialData?.Description || "");
  const [taskId, setTaskId] = useState(initialData?.taskId || initialData?.TaskId || 0);
  const [status, setStatus] = useState(((initialData?.status ?? initialData?.Status ?? 0) as number).toString());
  const [assignedTo, setAssignedTo] = useState<number | null>(initialData?.assignedTo ?? initialData?.AssignedTo ?? null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setFormError("חובה להזין כותרת");
    if (!taskId) return setFormError("חובה לבחור משימה");
    setFormError(null);

    const selectedTask = tasks.find((t: any) => (t.id || t.Id) === taskId);
    const taskName = selectedTask ? ((selectedTask as any).title ?? selectedTask.Title) : "";
    const id = initialData?.id ?? initialData?.Id;

    if (id) {
      onSubmit({
        Id: id,
        TaskId: taskId,
        TaskName: taskName,
        Title: title.trim(),
        Description: description,
        AssignedTo: assignedTo ?? 0,
        Status: parseInt(status),
        Deadline: initialData?.deadline || initialData?.Deadline || new Date(),
      });
      return;
    }

    onSubmit({
      taskId,
      taskName,
      title: title.trim(),
      description,
      status: parseInt(status),
      assignedTo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <div style={{ color: "#dc2626", marginBottom: "10px" }}>{formError}</div>}
      <div className="form-group">
        <label className="form-label">כותרת</label>
        <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">תיאור</label>
        <input className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">משימה</label>
        <select className="form-input" value={taskId} onChange={(e) => setTaskId(parseInt(e.target.value))} required>
          <option value="">בחר משימה</option>
          {tasks
            .filter((t: any) => (t.status ?? t.Status) !== 3 && (t.status ?? t.Status) !== 2)
            .map((t: any) => (
              <option key={t.id || t.Id} value={t.id || t.Id}>
                {(t as any).title ?? t.Title}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">עובד אחראי</label>
        <select className="form-input" value={assignedTo ?? ""} onChange={(e) => setAssignedTo(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">לא משויך</option>
          {users.map((u: any) => (
            <option key={u.id || u.Id} value={u.id || u.Id}>
              {(u as any).nameUser ?? u.NameUser}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">סטטוס</label>
        <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="0">פתוח</option>
          <option value="1">בביצוע</option>
          <option value="2">הושלם</option>
          <option value="3">בוטל</option>
        </select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          ביטול
        </button>
        <button type="submit" className="btn btn-primary">
          שמור
        </button>
      </div>
    </form>
  );
}

export default function SubTasksTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useToast();
  const { users } = useSelector((state: RootState) => state.users);
  const { subTasks, loading, error } = useSelector((state: RootState) => state.subTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSubTask, setEditSubTask] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchSubTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUserName = (id: number | null) => {
    if (!id) return "-";
    const user = users.find((u: any) => (u.id || u.Id) === id);
    return user ? ((user as any).nameUser ?? user.NameUser) : "-";
  };

  const handleAdd = async (task: any) => {
    try {
      await dispatch(addSubTask(task)).unwrap();
      notify("תת המשימה נוספה בהצלחה", "success");
      await dispatch(fetchSubTasks());
      setShowAddModal(false);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בהוספת תת משימה"), "error");
    }
  };

  const handleEdit = async (task: any) => {
    try {
      await dispatch(updateSubTask(task)).unwrap();
      notify("תת המשימה עודכנה בהצלחה", "success");
      await dispatch(fetchSubTasks());
      setEditSubTask(null);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בעדכון תת משימה"), "error");
    }
  };

  const handleCancel = async (task: any) => {
    try {
      await dispatch(cancelSubTask(task)).unwrap();
      notify("תת המשימה בוטלה", "success");
      await dispatch(fetchSubTasks());
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בביטול תת משימה"), "error");
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title"> תת משימות</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + הוסף תת משימה
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">הוספת תת משימה</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <SubTaskForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {editSubTask && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">עריכת תת משימה</h3>
              <button className="modal-close" onClick={() => setEditSubTask(null)}>
                ✕
              </button>
            </div>
            <SubTaskForm initialData={editSubTask} onSubmit={handleEdit} onCancel={() => setEditSubTask(null)} />
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>כותרת</th>
              <th>תיאור</th>
              <th>משויך למשימה </th>
              <th>עובד אחראי</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {subTasks
              .filter((subTask: any) => (subTask.status ?? subTask.Status) !== 3)
              .map((subTask: any) => (
                <tr key={subTask.id || subTask.Id}>
                  <td>{(subTask as any).title ?? subTask.Title}</td>
                  <td>{(subTask as any).description ?? subTask.Description}</td>
                  <td>{subTask.taskName || subTask.TaskName}</td>
                  <td>{getUserName(subTask.assignedTo ?? subTask.AssignedTo)}</td>
                  <td>
                    <span
                      className={`badge ${
                        (subTask.status ?? subTask.Status) === 1
                          ? "badge-progress"
                          : (subTask.status ?? subTask.Status) === 2
                            ? "badge-done"
                            : (subTask.status ?? subTask.Status) === 3
                              ? "badge-canceled"
                              : "badge-open"
                      }`}
                    >
                      {(subTask.status ?? subTask.Status) === 1 ? "בביצוע" : (subTask.status ?? subTask.Status) === 2 ? "הושלם" : (subTask.status ?? subTask.Status) === 3 ? "בוטל" : "פתוח"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      onClick={() => setEditSubTask(subTask)}
                      disabled={(subTask.status ?? subTask.Status) === 3}
                      style={{ marginInlineEnd: "8px" }}
                    >
                      עריכה
                    </button>
                    <button className="btn btn-danger" onClick={() => handleCancel(subTask)} disabled={(subTask.status ?? subTask.Status) === 3}>
                      ביטול
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

