import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import api from '../services/api'

export default function AdminStudents() {
  const navigate = useNavigate()
  const user = api.getCurrentUser()
  const [showAddForm, setShowAddForm] = useState(false)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form data
  const [formData, setFormData] = useState({
    student_id: '',
    full_name: '',
    username: '',
    email: '',
    password: '',
    department: 'Computer Science',
    semester: '1',
    year: new Date().getFullYear(),
    phone: '',
    date_of_birth: '',
    address: ''
  })

  const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil']
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
      return
    }
    // TODO: Fetch students from API
    setLoading(false)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: API call to add student
    console.log('Adding student:', formData)
    alert('Student added successfully! (API integration pending)')
    setShowAddForm(false)
    setFormData({
      student_id: '',
      full_name: '',
      username: '',
      email: '',
      password: '',
      department: 'Computer Science',
      semester: '1',
      year: new Date().getFullYear(),
      phone: '',
      date_of_birth: '',
      address: ''
    })
  }

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
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-10 h-10 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all"
          >
            <i className="fas fa-arrow-left text-slate-800 dark:text-white"></i>
          </button>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Students</h1>
        </div>
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

      {/* Add Student Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all"
        >
          <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'}`}></i>
          {showAddForm ? 'Cancel' : 'Add New Student'}
        </button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-6"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Add New Student</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student ID */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                placeholder="e.g., S2025109"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="e.g., john.doe"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@university.edu"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Semester <span className="text-red-500">*</span>
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2020"
                max="2030"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/70 dark:focus:bg-gray-700/70 transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <i className="fas fa-save mr-2"></i>
                Add Student
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Students List */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">All Students</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl text-slate-800 dark:text-white">Loading...</div>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-users text-6xl text-slate-400 mb-4"></i>
            <p className="text-slate-600 dark:text-slate-400">No students found. Add your first student!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                  <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">Student ID</th>
                  <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">Department</th>
                  <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">Semester</th>
                  <th className="px-4 py-3 text-left text-slate-700 dark:text-slate-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-all">
                    <td className="px-4 py-3 text-slate-800 dark:text-white">{student.student_id}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-white">{student.full_name}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-white">{student.department}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-white">Sem {student.semester}</td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mr-2 transition-all">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}
