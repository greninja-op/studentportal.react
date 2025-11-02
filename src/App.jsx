import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Notice from './pages/Notice'
import Payments from './pages/Payments'
import Subjects from './pages/Subjects'
import Result from './pages/Result'
import Analysis from './pages/Analysis'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import api from './services/api'

// Protected Route wrapper
function ProtectedRoute({ children, allowedRoles = [] }) {
  const isAuthenticated = api.isAuthenticated()
  const user = api.getCurrentUser()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><Dashboard /></ProtectedRoute>} />
          <Route path="/notice" element={<ProtectedRoute allowedRoles={['student']}><Notice /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute allowedRoles={['student']}><Payments /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute allowedRoles={['student']}><Subjects /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute allowedRoles={['student']}><Result /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute allowedRoles={['student']}><Analysis /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['staff']}><TeacherDashboard /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
