import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user || user.role !== 'staff') {
      navigate('/login')
    }
  }, [])

  const handleLogout = () => {
    api.logout()
    navigate('/login')
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
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Teacher Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.full_name}</span>
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
            <i className="fas fa-chalkboard-teacher text-xl"></i>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <i className="fas fa-chalkboard-teacher text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Welcome, {user?.full_name}!</h2>
            <p className="text-green-100">Faculty Portal</p>
          </div>
        </div>
      </div>

      {/* Teacher Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-book-open text-2xl text-blue-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">My Courses</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">View courses you're teaching</p>
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Add Marks */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-pen text-2xl text-green-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Add Marks</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Enter test and exam marks</p>
          <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* View Results */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-purple-500/10 dark:hover:bg-purple-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-chart-bar text-2xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">View Results</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Check student performance</p>
          <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Attendance */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-orange-500/10 dark:hover:bg-orange-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-calendar-check text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Attendance</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Mark student attendance</p>
          <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Student List */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-users text-2xl text-red-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Student List</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">View enrolled students</p>
          <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>

        {/* Announcements */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-teal-500/10 dark:hover:bg-teal-500/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
            <i className="fas fa-bullhorn text-2xl text-teal-500"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Announcements</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">View and post class notices</p>
          <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all">
            Open
          </button>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="mt-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">CS101 - Linux</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">9:00 AM - 10:30 AM</p>
            </div>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">Room 101</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">MA101 - Mathematics</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">11:00 AM - 12:30 PM</p>
            </div>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Room 205</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
