import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addTask, cancelTask, fetchTasks, updateTask } from "../../store/slices/tasksSlice";
import { fetchUsers } from "../../store/slices/usersSlice";
import { fetchProjects } from "../../store/slices/projectSlice";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "./utils";

function TaskForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (task: any) => void;
  onCancel: () => void;
  initialData?: any;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, []);

  const projects = useSelector((state: RootState) => state.projects.projects);
  const { users } = useSelector((state: RootState) => state.users);

  const [title, setTitle] = useState(initialData?.title || initialData?.Title || "");
  const [description, setDescription] = useState(initialData?.description || initialData?.Description || "");
  const [projectId, setProjectId] = useState(initialData?.projectId || initialData?.ProjectId || 0);
  const [expected, setExpected] = useState(initialData?.expected || initialData?.Expected || 1);
  const [priority, setPriority] = useState(((initialData?.priority ?? initialData?.Priority ?? 0) as number).toString());
  const [status, setStatus] = useState(((initialData?.status ?? initialData?.Status ?? 0) as number).toString());
  const [assignedTo, setAssignedTo] = useState<number | null>(initialData?.assignedTo ?? initialData?.AssignedTo ?? null);
  const [deadline, setDeadline] = useState(
    (initialData?.deadline || initialData?.Deadline) ? new Date(initialData.deadline || initialData.Deadline).toISOString().split("T")[0] : ""
  );
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setFormError("חובה להזין כותרת");
    if (!projectId) return setFormError("חובה לבחור פרויקט");
    if (!deadline) return setFormError("חובה לבחור דדליין");
    if (!expected || expected < 1) return setFormError("זמן משוער חייב להיות לפחות 1");
    setFormError(null);

    const selectedProject = projects.find((p: any) => (p.id || p.Id) === projectId);
    const projectName = selectedProject ? ((selectedProject as any).nameProject ?? selectedProject.NameProject) : "";
    const id = initialData?.id ?? initialData?.Id;

    if (id) {
      onSubmit({
        Id: id,
        ProjectId: projectId,
        ProjectName: projectName,
        Title: title.trim(),
        Description: description,
        Expected: expected,
        AssignedTo: assignedTo,
        Priority: parseInt(priority),
        Status: parseInt(status),
        StartedAt: initialData?.startedAt || initialData?.StartedAt || new Date(),
        Deadline: new Date(deadline),
      });
      return;
    }

    onSubmit({
      projectId,
      projectName,
      title: title.trim(),
      description,
      priority: parseInt(priority),
      status: parseInt(status),
      deadline: new Date(deadline),
      expected,
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
        <label className="form-label">פרויקט</label>
        <select className="form-input" value={projectId} onChange={(e) => setProjectId(parseInt(e.target.value))} required>
          <option value="">בחר פרויקט</option>
          {projects.map((p: any) => (
            <option key={p.id || p.Id} value={p.id || p.Id}>
              {(p as any).nameProject ?? p.NameProject}
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
        <label className="form-label">עדיפות</label>
        <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="0">נמוכה</option>
          <option value="1">בינונית</option>
          <option value="2">גבוהה</option>
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
      <div className="form-group">
        <label className="form-label">זמן משוער (בימים)</label>
        <input className="form-input" type="number" min={1} value={expected} onChange={(e) => setExpected(parseInt(e.target.value))} required />
      </div>
      <div className="form-group">
        <label className="form-label">דדליין</label>
        <input className="form-input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
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

export default function TasksTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useToast();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { users } = useSelector((state: RootState) => state.users);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, []);

  const getUserName = (id: number | null) => {
    if (!id) return "-";
    const user = users.find((u: any) => (u.id || u.Id) === id);
    return user ? ((user as any).nameUser ?? user.NameUser) : "-";
  };

  const handleAdd = async (task: any) => {
    try {
      await dispatch(addTask(task)).unwrap();
      notify("המשימה נוספה בהצלחה", "success");
      await dispatch(fetchTasks());
      setShowAddModal(false);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בהוספת משימה"), "error");
    }
  };

  const handleEdit = async (task: any) => {
    try {
      await dispatch(updateTask(task)).unwrap();
      notify("המשימה עודכנה בהצלחה", "success");
      await dispatch(fetchTasks());
      setEditTask(null);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בעדכון משימה"), "error");
    }
  };

  const handleCancel = async (task: any) => {
    try {
      await dispatch(cancelTask(task)).unwrap();
      notify("המשימה בוטלה", "success");
      await dispatch(fetchTasks());
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בביטול משימה"), "error");
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">משימות</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + הוסף משימה
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">הוספת משימה</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <TaskForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {editTask && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">עריכת משימה</h3>
              <button className="modal-close" onClick={() => setEditTask(null)}>
                ✕
              </button>
            </div>
            <TaskForm initialData={editTask} onSubmit={handleEdit} onCancel={() => setEditTask(null)} />
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>כותרת</th>
              <th>תיאור</th>
              <th>משויך לפרויקט</th>
              <th>עובד אחראי</th>
              <th>עדיפות</th>
              <th>סטטוס</th>
              <th>דדליין</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task: any) => (task.status ?? task.Status) !== 3)
              .map((task: any) => (
                <tr key={task.id || task.Id}>
                  <td>{(task as any).title ?? task.Title}</td>
                  <td>{(task as any).description ?? task.Description}</td>
                  <td>{task.projectName || task.ProjectName || "-"}</td>
                  <td>{getUserName(task.assignedTo ?? task.AssignedTo)}</td>
                  <td>
                    <span
                      className={`badge ${
                        (task.priority ?? task.Priority) === 2 ? "badge-high" : (task.priority ?? task.Priority) === 1 ? "badge-medium" : "badge-low"
                      }`}
                    >
                      {(task.priority ?? task.Priority) === 2 ? "גבוהה" : (task.priority ?? task.Priority) === 1 ? "בינונית" : "נמוכה"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        (task.status ?? task.Status) === 1
                          ? "badge-progress"
                          : (task.status ?? task.Status) === 2
                            ? "badge-done"
                            : (task.status ?? task.Status) === 3
                              ? "badge-canceled"
                              : "badge-open"
                      }`}
                    >
                      {(task.status ?? task.Status) === 1 ? "בביצוע" : (task.status ?? task.Status) === 2 ? "הושלם" : (task.status ?? task.Status) === 3 ? "בוטל" : "פתוח"}
                    </span>
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleDateString("he-IL") : "-"}</td>
                  <td>
                    <button
                      className="btn btn-outline"
                      onClick={() => setEditTask(task)}
                      disabled={(task.status ?? task.Status) === 3}
                      style={{ marginInlineEnd: "8px" }}
                    >
                      עריכה
                    </button>
                    <button className="btn btn-danger" onClick={() => handleCancel(task)} disabled={(task.status ?? task.Status) === 3}>
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

