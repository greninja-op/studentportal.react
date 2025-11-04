// API Configuration
const API_BASE_URL = 'http://localhost/studentportal-api/api';

// API Service for Student Portal
class ApiService {
  // Authentication
  async login(username, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      
      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Dashboard Stats
  async getDashboardStats(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/get_stats.php?student_id=${studentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return { success: false, message: 'Failed to fetch dashboard stats' };
    }
  }

  // Get Subjects
  async getSubjects(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects/get_all.php?student_id=${studentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Subjects error:', error);
      return { success: false, message: 'Failed to fetch subjects' };
    }
  }

  // Get Results
  async getResults(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/results/get_all.php?student_id=${studentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Results error:', error);
      return { success: false, message: 'Failed to fetch results' };
    }
  }

  // Get Payments
  async getPayments(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/get_all.php?student_id=${studentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payments error:', error);
      return { success: false, message: 'Failed to fetch payments' };
    }
  }

  // Process Payment
  async processPayment(paymentId, paymentMethod) {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/process.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          payment_id: paymentId, 
          payment_method: paymentMethod 
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, message: 'Failed to process payment' };
    }
  }

  // Get Notices
  async getNotices() {
    try {
      const response = await fetch(`${API_BASE_URL}/notices/get_all.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Notices error:', error);
      return { success: false, message: 'Failed to fetch notices' };
    }
  }

  // Admin - Get All Students
  async getStudents() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get_students.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get students error:', error);
      return { success: false, message: 'Failed to fetch students' };
    }
  }

  // Admin - Add Student
  async addStudent(studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/add_student.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Add student error:', error);
      return { success: false, message: 'Failed to add student' };
    }
  }

  // Admin - Update Student
  async updateStudent(studentId, studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/update_student.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...studentData, student_id: studentId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update student error:', error);
      return { success: false, message: 'Failed to update student' };
    }
  }

  // Admin - Delete Student
  async deleteStudent(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/delete_student.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Delete student error:', error);
      return { success: false, message: 'Failed to delete student' };
    }
  }

  // Admin - Get All Teachers
  async getTeachers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get_teachers.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get teachers error:', error);
      return { success: false, message: 'Failed to fetch teachers' };
    }
  }

  // Admin - Add Teacher
  async addTeacher(teacherData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/add_teacher.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Add teacher error:', error);
      return { success: false, message: 'Failed to add teacher' };
    }
  }

  // Upload Image
  async uploadImage(file) {
    try {
      console.log('Uploading file:', file);
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`${API_BASE_URL}/upload/upload_image.php`, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Upload failed' };
      }
      
      return data;
    } catch (error) {
      console.error('Upload image error:', error);
      return { success: false, error: 'Failed to upload image: ' + error.message };
    }
  }
}

export default new ApiService();
