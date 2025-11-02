import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function Notice() {
  const navigate = useNavigate()
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchNotices = async () => {
      try {
        const result = await api.getNotices()
        if (result.success) {
          setNotices(result.data || [])
        }
      } catch (error) {
        console.error('Error fetching notices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const getCategoryIcon = (category) => {
    const icons = {
      'Academic': 'fa-book-open',
      'Administrative': 'fa-building',
      'Event': 'fa-calendar-alt',
      'Exam': 'fa-file-alt',
      'Fee': 'fa-file-invoice-dollar',
      'General': 'fa-info-circle'
    }
    return icons[category] || 'fa-bell'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-green-500/20 text-green-500',
      'Administrative': 'bg-gray-500/20 text-gray-500',
      'Event': 'bg-blue-500/20 text-blue-500',
      'Exam': 'bg-orange-500/20 text-orange-500',
      'Fee': 'bg-red-500/20 text-red-500',
      'General': 'bg-purple-500/20 text-purple-500'
    }
    return colors[category] || 'bg-indigo-500/20 text-indigo-500'
  }

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
        className="min-h-screen pb-24 px-4 py-6 max-w-5xl mx-auto"
      >
      {/* Top Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Notice Board</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.name || 'Student'}</span>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <i className="fas fa-user-circle text-2xl"></i>
          </div>
        </div>
      </header>

      <p className="text-slate-600 dark:text-slate-400 mb-8">Stay updated with announcements</p>

      {/* Notices */}
      <div className="space-y-6">
        {notices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No notices available at the moment.</p>
          </div>
        ) : (
          notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 ${getCategoryColor(notice.category)} rounded-full`}>
                  <i className={`fas ${getCategoryIcon(notice.category)} text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {notice.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                      {notice.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                    <i className="far fa-calendar mr-2"></i>
                    {new Date(notice.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {notice.content}
              </p>
            </div>
          ))
        )}
      </div>
      </motion.div>
      <Navigation />
    </>
  )
}
