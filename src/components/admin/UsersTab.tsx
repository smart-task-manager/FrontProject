import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { deactivateUser, fetchUsers } from "../../store/slices/usersSlice";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "./utils";

export default function UsersTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useToast();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeactivate = async (user: any) => {
    try {
      await dispatch(deactivateUser(user)).unwrap();
      notify("העובד הושבת", "success");
      await dispatch(fetchUsers());
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה בהשבתת עובד"), "error");
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">עובדים</h2>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>שם</th>
              <th>אימייל</th>
              <th>תפקיד</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user: any) => (user.role || user.Role) !== "admin")
              .filter((user: any) => (user.isActive ?? user.IsActive) === true)
              .map((user: any) => (
                <tr key={user.id || user.Id}>
                  <td>{(user as any).nameUser ?? user.NameUser}</td>
                  <td>{user.email || user.Email}</td>
                  <td>{user.role === "admin" ? "מנהל" : "עובד"}</td>
                  <td>
                    <span className={`badge ${(user.isActive ?? user.IsActive) ? "badge-done" : "badge-canceled"}`}>
                      {(user.isActive ?? user.IsActive) ? "פעיל" : "מושבת"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeactivate(user)} disabled={!(user.isActive ?? user.IsActive)}>
                      השבת
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
