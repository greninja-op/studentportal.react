import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const user = api.getCurrentUser()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    activeNotices: 0
  })
  const [recentNotices, setRecentNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
      return
    }
    
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch notices
      const noticesResult = await api.getNotices()
      if (noticesResult.success) {
        setRecentNotices(noticesResult.data.slice(0, 3))
        setStats(prev => ({ ...prev, activeNotices: noticesResult.data.length }))
      }
      // TODO: Add API calls for student/teacher/course counts
      setStats(prev => ({ ...prev, totalStudents: 1, totalTeachers: 5, totalCourses: 6 }))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    api.logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-slate-800 dark:text-white">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pb-24 px-4 py-6 max-w-7xl mx-auto"
    >
      {/* Top Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.full_name}</span>
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <i className="fas fa-user-shield text-xl"></i>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/90 font-medium">Total Students</p>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-user-graduate text-white"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalStudents}</p>
          <p className="text-blue-100 text-sm">+12% from last month</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-green-500 to-green-600 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/90 font-medium">Total Teachers</p>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-chalkboard-teacher text-white"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalTeachers}</p>
          <p className="text-green-100 text-sm">Active faculty members</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/90 font-medium">Total Courses</p>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-book text-white"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.totalCourses}</p>
          <p className="text-purple-100 text-sm">Across all departments</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/90 font-medium">Active Notices</p>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-bell text-white"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{stats.activeNotices}</p>
          <p className="text-orange-100 text-sm">Posted this week</p>
        </motion.div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <i className="fas fa-calendar-alt text-2xl text-indigo-500"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Today's Overview</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Total Classes</span>
              <span className="font-bold text-slate-800 dark:text-white">24</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Attendance</span>
              <span className="font-bold text-slate-800 dark:text-white">92%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Exams Today</span>
              <span className="font-bold text-slate-800 dark:text-white">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-chart-line text-2xl text-emerald-500"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Pass Rate</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">87%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Avg. GPA</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">3.42</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Pending Results</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-2xl text-rose-500"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Alerts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-rose-500/10 dark:bg-rose-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Low Attendance</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Pending Fees</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">15</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
              <span className="text-slate-700 dark:text-slate-300">Submissions Due</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Students */}
        <div 
          onClick={() => navigate('/admin/students')}
          className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-user-graduate text-2xl text-blue-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Manage Students</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Add, edit, or remove student records</p>
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Manage Teachers */}
        <div 
          onClick={() => navigate('/admin/teachers')}
          className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-chalkboard-teacher text-2xl text-green-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Manage Teachers</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Add, edit, or remove teacher profiles</p>
          <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Manage Courses */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-purple-500/10 dark:hover:bg-purple-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-book text-2xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Manage Courses</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Create and manage course catalog</p>
          <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Manage Enrollments */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-orange-500/10 dark:hover:bg-orange-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-clipboard-list text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Enrollments</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Manage student course enrollments</p>
          <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Post Notices */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-bullhorn text-2xl text-red-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Post Notices</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Create and manage announcements</p>
          <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Fee Management */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-teal-500/10 dark:hover:bg-teal-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-dollar-sign text-2xl text-teal-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Fee Management</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Track and manage fee payments</p>
          <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>
      </div>

      {/* Recent Notices */}
      {recentNotices.length > 0 && (
        <div className="mt-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Recent Notices</h3>
          <div className="space-y-3">
            {recentNotices.map((notice, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-bell text-indigo-500"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-white">{notice.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{notice.content.substring(0, 100)}...</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
