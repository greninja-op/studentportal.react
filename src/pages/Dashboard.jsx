import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchStats = async () => {
      try {
        const result = await api.getDashboardStats(user.student_id)
        if (result.success) {
          setStats(result.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-slate-800 dark:text-white">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pb-24 px-4 py-6 max-w-7xl mx-auto"
      >
      {/* Top Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.name || 'Student'}</span>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <i className="fas fa-user-circle text-2xl"></i>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0">
              <i className="fas fa-user-circle text-3xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                Welcome Back, {user?.name?.split(' ')[0] || 'Student'}!
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Here's what's happening today. Let's make it a productive one!
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Progress */}
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Academic Progress
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36">
                  <svg className="transform -rotate-90" width="140" height="140">
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="377"
                      strokeDashoffset="75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800 dark:text-white">{stats?.gpa || '0.0'}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">GPA</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-slate-600 dark:text-slate-400">
                  Great job! Keep up the excellent work.
                </p>
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Upcoming Assignments
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">CS101: Final Project</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Due: May 15, 2024</p>
                  </div>
                  <a href="#" className="text-blue-500 text-sm hover:underline">View</a>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">ENG203: Essay on Modernism</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Due: May 20, 2024</p>
                  </div>
                  <a href="#" className="text-blue-500 text-sm hover:underline">View</a>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">MATH305: Problem Set 5</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Due: May 22, 2024</p>
                  </div>
                  <a href="#" className="text-blue-500 text-sm hover:underline">View</a>
                </div>
              </div>
            </div>
          </div>

          {/* College Announcements */}
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              College Announcements
            </h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p> Library hours extended during finals week</p>
              <p> Summer course registration is now open</p>
              <p> Campus-wide power outage on May 25th from 1 AM to 5 AM</p>
            </div>
          </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Notifications</h3>
          
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all cursor-pointer">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Annual Tech Fest "Innovate 2024"
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Join us for a day of innovation and technology. Starts tomorrow at 10 AM in the main auditorium.
                </p>
              </div>
              <i className="fas fa-chevron-right text-slate-400"></i>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all cursor-pointer">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white flex-shrink-0">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Tuition Fee Payment Reminder
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your tuition fee for the upcoming semester is due in 3 days. Please pay to avoid late fees.
                </p>
              </div>
              <i className="fas fa-chevron-right text-slate-400"></i>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all cursor-pointer">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Mid-term Exam Schedule
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The schedule for mid-term exams has been released. Check your portal for details.
                </p>
              </div>
              <i className="fas fa-chevron-right text-slate-400"></i>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
      <Navigation />
    </>
  )
}
