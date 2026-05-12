import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";
import ProjectsTab from "./ProjectsTab";
import TasksTab from "./TasksTab";
import SubTasksTab from "./SubTasksTab";
import UsersTab from "./UsersTab";
import HistoryTab from "./HistoryTab";
import { ToastProvider } from "../ui/Toast";

type Tab = "projects" | "tasks" | "subtasks" | "users" | "history";

export default function AdminPanelLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <ToastProvider>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-title">לוח מנהל</div>
          </div>
          <div className="nav-section-title">ניהול</div>
          {[
            { id: "projects", label: "פרויקטים", icon: "📁" },
            { id: "tasks", label: "משימות", icon: "✓" },
            { id: "subtasks", label: "תתי משימות", icon: "◦" },
          ].map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id as Tab)}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div className="nav-section-title">צוות</div>
          {[
            { id: "users", label: "עובדים", icon: "👥" },
            { id: "history", label: "ביצועים", icon: "📊" },
          ].map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id as Tab)}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}

          <div className="nav-item" onClick={handleLogout} style={{ color: "#ef4444", marginTop: "auto", cursor: "pointer" }}>
            <span>🚪</span>
            התנתק
          </div>
        </div>

        <div className="admin-main">
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "tasks" && <TasksTab />}
          {activeTab === "subtasks" && <SubTasksTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>
      </div>
    </ToastProvider>
  );
}
