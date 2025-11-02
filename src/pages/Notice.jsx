import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'

export default function Notice() {
  const notices = [
    {
      icon: 'fa-file-invoice-dollar',
      iconColor: 'bg-red-500/20 text-red-500',
      title: 'Fee Payment Reminder',
      date: 'April 29, 2024',
      description: 'This is a reminder that the tuition fee for the upcoming semester is due by May 5th. Please ensure timely payment to avoid late fees.'
    },
    {
      icon: 'fa-calendar-alt',
      iconColor: 'bg-blue-500/20 text-blue-500',
      title: 'Annual Tech Fest "Innovate 2024"',
      date: 'April 28, 2024',
      description: 'Join us for an exciting day of technology and innovation. The event kicks off on May 10th at 10 AM in the main auditorium. All students are welcome!'
    },
    {
      icon: 'fa-book-open',
      iconColor: 'bg-green-500/20 text-green-500',
      title: 'Mid-term Exam Schedule Released',
      date: 'April 27, 2024',
      description: 'The schedule for mid-term examinations has been released. Please check your student portal for detailed timings and exam locations.'
    },
    {
      icon: 'fa-graduation-cap',
      iconColor: 'bg-purple-500/20 text-purple-500',
      title: 'Guest Lecture: AI & Machine Learning',
      date: 'April 26, 2024',
      description: 'Dr. Jane Smith from MIT will deliver a guest lecture on Artificial Intelligence and Machine Learning on May 8th at 3 PM in Lecture Hall A.'
    }
  ]

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
          <span className="text-slate-700 dark:text-slate-300 font-medium">Sarah Lee</span>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <i className="fas fa-user-circle text-2xl"></i>
          </div>
        </div>
      </header>

      <p className="text-slate-600 dark:text-slate-400 mb-8">Stay updated with announcements</p>

      {/* Notices */}
      <div className="space-y-6">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 ${notice.iconColor} rounded-full`}>
                <i className={`fas ${notice.icon} text-2xl`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {notice.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">
                  <i className="far fa-calendar mr-2"></i>
                  {notice.date}
                </p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {notice.description}
            </p>
          </div>
        ))}
      </div>
      </motion.div>
      <Navigation />
    </>
  )
}
