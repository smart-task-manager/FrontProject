import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addProject, cancelProject, fetchProjects, updateProject } from "../../store/slices/projectSlice";
import type { Project } from "../../types";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "./utils";

function ProjectForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (project: Partial<Project>) => void;
  onCancel: () => void;
  initialData?: Project;
}) {
  const [nameProject, setNameProject] = useState((initialData as any)?.nameProject || initialData?.NameProject || "");
  const [description, setDescription] = useState((initialData as any)?.description || initialData?.Description || "");
  const [status, setStatus] = useState(((initialData as any)?.status ?? initialData?.Status ?? 0).toString());
  const [deadline, setDeadline] = useState(
    ((initialData as any)?.deadline || initialData?.Deadline)
      ? new Date((initialData as any)?.deadline || initialData?.Deadline).toISOString().split("T")[0]
      : ""
  );
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameProject.trim()) {
      setFormError("חובה להזין שם פרויקט");
      return;
    }
    if (!deadline) {
      setFormError("חובה לבחור דדליין");
      return;
    }
    setFormError(null);

    const id = (initialData as any)?.id ?? initialData?.Id;
    onSubmit({
      ...(id ? { Id: id } : {}),
      NameProject: nameProject.trim(),
      Description: description,
      Status: parseInt(status) as any,
      Deadline: new Date(deadline),
    } as any);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <div style={{ color: "#dc2626", marginBottom: "10px" }}>{formError}</div>}
      <div className="form-group">
        <label className="form-label">שם פרויקט</label>
        <input className="form-input" value={nameProject} onChange={(e) => setNameProject(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">תיאור</label>
        <input className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default function ProjectsTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useToast();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProject, setEditProject] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleAdd = async (project: Partial<Project>) => {
    try {
      await dispatch(addProject(project)).unwrap();
      notify("הפרויקט נוסף בהצלחה", "success");
      await dispatch(fetchProjects());
      setShowAddModal(false);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בהוספת פרויקט"), "error");
    }
  };

  const handleEdit = async (project: any) => {
    try {
      await dispatch(updateProject(project)).unwrap();
      notify("הפרויקט עודכן בהצלחה", "success");
      await dispatch(fetchProjects());
      setEditProject(null);
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בעדכון פרויקט"), "error");
    }
  };

  const handleCancel = async (project: Project) => {
    try {
      await dispatch(cancelProject(project)).unwrap();
      notify("הפרויקט בוטל", "success");
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בביטול פרויקט"), "error");
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">פרויקטים</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + הוסף פרויקט
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">הוספת פרויקט</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <ProjectForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {editProject && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">עריכת פרויקט</h3>
              <button className="modal-close" onClick={() => setEditProject(null)}>
                ✕
              </button>
            </div>
            <ProjectForm initialData={editProject} onSubmit={handleEdit} onCancel={() => setEditProject(null)} />
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>שם</th>
              <th>תיאור</th>
              <th>דדליין</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id || project.Id}>
                <td>{(project as any).nameProject || project.NameProject}</td>
                <td>{(project as any).description || project.Description}</td>
                <td>{(project as any).deadline ? new Date((project as any).deadline).toLocaleDateString("he-IL") : "-"}</td>
                <td>
                  <span
                    className={`badge ${
                      project.Status == 1 ? "badge-progress" : project.Status == 2 ? "badge-done" : project.Status == 3 ? "badge-canceled" : "badge-open"
                    }`}
                  >
                    {project.Status == 1 ? "בביצוע" : project.Status == 2 ? "הושלם" : project.Status == 3 ? "בוטל" : "פתוח"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline"
                    onClick={() => setEditProject(project)}
                    disabled={project.Status == 3}
                    style={{ marginInlineEnd: "8px" }}
                  >
                    עריכה
                  </button>
                  <button className="btn btn-danger" onClick={() => handleCancel(project)} disabled={project.Status == 3}>
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

