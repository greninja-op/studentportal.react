import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Notice from './pages/Notice'
import Payments from './pages/Payments'
import Subjects from './pages/Subjects'
import Result from './pages/Result'
import Analysis from './pages/Analysis'
import api from './services/api'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = api.isAuthenticated()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/notice" element={<ProtectedRoute><Notice /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
