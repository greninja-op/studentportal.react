import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
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

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <i className="fas fa-user-shield text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Welcome, {user?.full_name}!</h2>
            <p className="text-purple-100">Administrator Access</p>
          </div>
        </div>
      </div>

      {/* Admin Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Students */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all cursor-pointer">
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
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all cursor-pointer">
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

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Total Students</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-white">1</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Total Teachers</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-white">5</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Total Courses</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-white">6</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-2">Active Notices</p>
          <p className="text-4xl font-bold text-slate-800 dark:text-white">4</p>
        </div>
      </div>
    </motion.div>
  )
}
