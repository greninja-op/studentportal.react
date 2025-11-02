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
}

export default new ApiService();
