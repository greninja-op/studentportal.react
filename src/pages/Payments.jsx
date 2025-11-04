import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function Payments() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [summary, setSummary] = useState({ total_paid: 0, total_pending: 0 })
  const [loading, setLoading] = useState(true)
  const user = api.getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchPayments = async () => {
      try {
        const result = await api.getPayments(user.student_id)
        if (result.success) {
          setPayments(result.data || [])
          setSummary(result.summary || { total_paid: 0, total_pending: 0 })
        }
      } catch (error) {
        console.error('Error fetching payments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const handlePayNow = async (paymentId) => {
    const result = await api.processPayment(paymentId, 'Online')
    if (result.success) {
      // Refresh payments
      const updatedResult = await api.getPayments(user.student_id)
      if (updatedResult.success) {
        setPayments(updatedResult.data || [])
        setSummary(updatedResult.summary || { total_paid: 0, total_pending: 0 })
      }
    }
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
        className="min-h-screen pb-24 px-4 py-6 max-w-6xl mx-auto"
      >
        {/* Top Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Fee Payments</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-slate-700 dark:text-slate-300 font-medium">{user?.full_name || 'Student'}</span>
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.full_name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {user?.full_name?.charAt(0) || 'S'}
              </div>
            )}
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
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{summary.total_paid.toLocaleString()}</p>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all cursor-pointer">
            <div className="text-red-500 mb-3">
              <i className="fas fa-exclamation-circle text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Pending</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹{summary.total_pending.toLocaleString()}</p>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Payment History</h2>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                  payment.status === 'paid' 
                    ? 'bg-green-500/10 dark:bg-green-500/20 hover:bg-green-500/20 dark:hover:bg-green-500/30' 
                    : 'bg-red-500/10 dark:bg-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/30'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    payment.status === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    <i className={`fas ${
                      payment.status === 'paid' ? 'fa-check' : 'fa-clock'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white">{payment.description}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Due: {new Date(payment.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">₹{payment.amount.toLocaleString()}</p>
                  {payment.status === 'pending' && (
                    <button
                      onClick={() => handlePayNow(payment.id)}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
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
