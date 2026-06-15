import { Navigate } from "react-router-dom";
function AdminRoute({ children }) {
    const user = JSON.parse(
        localStorage.getItem("user")
    );
    if (
        !user ||
        !(["admin", "staff"].includes(user?.role))
    ) {
        return <Navigate to="/dashboard" />;
    }
    return children;
}
export default AdminRoute;