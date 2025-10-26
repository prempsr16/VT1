import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Role } from './types';
import { Toaster } from 'react-hot-toast';

// Page Imports
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import DashboardLayout from './components/layout/DashboardLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();
  
  const getHomeRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case Role.Admin: return '/admin';
      case Role.Teacher: return '/teacher';
      case Role.Student: return '/student';
      case Role.Parent: return '/parent';
      default: return '/login';
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/admin" element={<ProtectedRoute allowedRoles={[Role.Admin]}><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={[Role.Teacher]}><DashboardLayout><TeacherDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute allowedRoles={[Role.Student]}><DashboardLayout><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/parent" element={<ProtectedRoute allowedRoles={[Role.Parent]}><DashboardLayout><ParentDashboard /></DashboardLayout></ProtectedRoute>} />

      <Route path="/" element={<Navigate to={getHomeRoute()} replace />} />
      <Route path="*" element={<Navigate to={getHomeRoute()} replace />} />
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
       <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937', // gray-800
            color: '#f3f4f6', // gray-200
            border: '1px solid #4b5563' // gray-600
          },
        }}
      />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;