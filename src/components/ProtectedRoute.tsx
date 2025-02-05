import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}; 

export const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    } else if (token && JSON.parse(localStorage.getItem('currentUser') || '{}').role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
