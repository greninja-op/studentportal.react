import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Notice from './pages/Notice'
import Payments from './pages/Payments'
import Subjects from './pages/Subjects'
import Result from './pages/Result'
import Analysis from './pages/Analysis'

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
