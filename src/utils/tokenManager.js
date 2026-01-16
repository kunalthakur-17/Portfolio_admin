import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

class TokenManager {
  constructor() {
    this.isChecking = false;
    this.lastCheck = 0;
    this.checkInterval = 30000; // 30 seconds
    this.warningThreshold = 300; // 5 minutes before expiry
    this.expiryThreshold = 0; // Immediate
  }

  // Get current token
  getToken() {
    return localStorage.getItem("accessToken") || sessionStorage.getItem("token");
  }

  // Check if token is valid
  isTokenValid() {
    const now = Date.now();
    
    // Prevent multiple checks within short interval
    if (this.isChecking || (now - this.lastCheck) < 5000) {
      return this.lastValidity;
    }

    this.isChecking = true;
    this.lastCheck = now;

    const token = this.getToken();
    if (!token) {
      this.lastValidity = false;
      this.isChecking = false;
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = now / 1000;
      const timeUntilExpiry = decoded.exp - currentTime;

      if (timeUntilExpiry <= this.expiryThreshold) {
        // Token expired
        this.handleTokenExpired();
        this.lastValidity = false;
      } else if (timeUntilExpiry < this.warningThreshold) {
        // Token expiring soon (within 5 minutes)
        this.showWarning(timeUntilExpiry);
        this.lastValidity = true;
      } else {
        // Token valid
        this.lastValidity = true;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      this.lastValidity = false;
    }

    this.isChecking = false;
    return this.lastValidity;
  }

  // Show warning for expiring token
  showWarning(timeRemaining) {
    // Only show warning if not already shown recently
    if (!this.warningShown || (Date.now() - this.lastWarning) > 60000) {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = Math.floor(timeRemaining % 60);
      toast.warning(`Session expiring in ${minutes}:${seconds.toString().padStart(2, '0')}`, {
        toastId: 'session-warning',
        autoClose: 10000
      });
      this.warningShown = true;
      this.lastWarning = Date.now();
    }
  }

  // Handle token expiry
  handleTokenExpired() {
    toast.error("Your session has expired. Redirecting to login...", {
      toastId: 'session-expired'
    });
    
    setTimeout(() => {
      sessionStorage.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }, 1500);
  }

  // Reset warning state
  resetWarning() {
    this.warningShown = false;
    this.lastWarning = 0;
  }
}

// Create singleton instance
const tokenManager = new TokenManager();

export default tokenManager;
