import { Navigate } from "react-router-dom";

function PrivateAdminRoute({ children }) {
    const isAdmin = localStorage.getItem("adminToken");
    return isAdmin ? children : <Navigate to="/login" />;
}

export default PrivateAdminRoute;
