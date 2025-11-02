import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function Subjects() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchSubjects = async () => {
      try {
        const result = await api.getSubjects(user.student_id)
        if (result.success) {
          setSubjects(result.data || [])
        }
      } catch (error) {
        console.error('Error fetching subjects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
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
        className="min-h-screen pb-24 px-4 py-6 max-w-6xl mx-auto"
      >
      {/* Top Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Subjects</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.name || 'Student'}</span>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <i className="fas fa-user-circle text-2xl"></i>
          </div>
        </div>
      </header>

      <p className="text-slate-600 dark:text-slate-400 mb-8">Current semester courses</p>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-2">
                  {subject.subject_code}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {subject.subject_name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                  <i className="fas fa-user-tie mr-2"></i>
                  {subject.teacher_name}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  <i className="fas fa-graduation-cap mr-2"></i>
                  {subject.credits} Credits
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      </motion.div>
      <Navigation />
    </>
  )
}
