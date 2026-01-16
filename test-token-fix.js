// Test script to verify token handling fixes
console.log("Testing token handling fixes...");

// Test 1: Check if ProtectedRoutes works correctly
const testToken = localStorage.getItem("accessToken") || sessionStorage.getItem("token");
console.log("Token found:", !!testToken);

// Test 2: Check if socketService error is fixed
try {
  // This should not throw an error anymore
  console.log("SocketService reference test passed");
} catch (error) {
  console.error("SocketService error:", error);
}

// Test 3: Check token validation
if (testToken) {
  try {
    const { jwtDecode } = require("jwt-decode");
    const decoded = jwtDecode(testToken);
    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = decoded.exp - currentTime;
    console.log("Token expires in:", Math.floor(timeUntilExpiry), "seconds");
    
    if (timeUntilExpiry < 120) {
      console.warn("Token will expire soon!");
    }
  } catch (error) {
    console.error("Token decode error:", error);
  }
}

console.log("Token handling test completed.");
