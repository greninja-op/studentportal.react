import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'

export default function Payments() {
  const payments = [
    { description: 'Semester Fee - Spring 2024', date: 'March 15, 2024', amount: '$2,000', status: 'paid' },
    { description: 'Library Fee', date: 'February 10, 2024', amount: '$150', status: 'paid' },
    { description: 'Lab Fee', date: 'January 20, 2024', amount: '$300', status: 'paid' },
    { description: 'Sports Fee', date: 'December 15, 2023', amount: '$200', status: 'paid' }
  ]

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
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Fee Payments</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Sarah Lee</span>
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <i className="fas fa-user-circle text-2xl"></i>
            </div>
          </div>
        </header>

        <p className="text-slate-600 dark:text-slate-400 mb-8">Manage your payments and dues</p>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all cursor-pointer">
            <div className="text-green-500 mb-3">
              <i className="fas fa-check-circle text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Paid</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$2,650</p>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all cursor-pointer">
            <div className="text-red-500 mb-3">
              <i className="fas fa-exclamation-circle text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Pending</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">$0</p>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Payment History</h2>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-green-500/10 dark:bg-green-500/20 rounded-xl hover:bg-green-500/20 dark:hover:bg-green-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{payment.description}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{payment.date}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">{payment.amount}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Download Receipt
          </button>
        </div>
      </motion.div>
      <Navigation />
    </>
  )
}
