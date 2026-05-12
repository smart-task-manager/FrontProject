import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { deactivateUser, fetchUsers } from "../../store/slices/usersSlice";
import { useToast } from "../ui/Toast";
import { getErrorMessage } from "./utils";
import ErrorMessage from "../ui/ErrorMessage";

export default function UsersTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useToast();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeactivate = async (user: any) => {
    try {
      const result = await dispatch(deactivateUser(user)).unwrap();
      notify((result as any).deleted ? "העובד נמחק בהצלחה" : "העובד הושבת בהצלחה", "success");
      await dispatch(fetchUsers());
    } catch (err: any) {
      notify(getErrorMessage(err, "שגיאה במחיקת עובד"), "error");
    }
  };

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <ErrorMessage message={error} title="טעינת העובדים נכשלה" />;

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
              .filter((user: any) => (user.isActive ?? user.IsActive) !== false)
              .map((user: any) => (
                <tr key={user.id || user.Id}>
                  <td>{user.nameUser ?? user.NameUser}</td>
                  <td>{user.email || user.Email}</td>
                  <td>{(user.role || user.Role) === "admin" ? "מנהל" : "עובד"}</td>
                  <td>
                    <span className={`badge ${(user.isActive ?? user.IsActive) !== false ? "badge-done" : "badge-canceled"}`}>
                      {(user.isActive ?? user.IsActive) !== false ? "פעיל" : "מושבת"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeactivate(user)}
                      disabled={(user.isActive ?? user.IsActive) === false}
                    >
                      מחק
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
