import { Navigate, Outlet } from "react-router-dom";

 const ProtectedRoute = () => {
    // Replace this with your actual auth hook or state management logic
    // const { isAuthenticated } = useAuth(); 
    const isAuthenticated = true;

    if (!isAuthenticated) {
        // Redirect to a login page, or back to your home/index route
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute