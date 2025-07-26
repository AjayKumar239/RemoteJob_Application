import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  subscribed?: boolean;
  preferences?: any;
}

interface SavedJob {
  jobId: string;
  title: string;
  company: string;
  savedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  savedJobs: SavedJob[];
  saveJob: (jobId: string, title: string, company: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved token in localStorage
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      setToken(savedToken);
      
      // Configure axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      
      // Fetch user data if token exists
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch user profile data from API
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/user/profile`);
      
      if (response.data.success) {
        setUser(response.data.user);
        // If user has saved jobs, set them
        if (response.data.user.savedJobs) {
          setSavedJobs(response.data.user.savedJobs);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If error (likely expired token), clear auth state
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      const { token: newToken, user: userData } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', newToken);
      
      // Set auth state
      setToken(newToken);
      setUser(userData);
      
      // Set default auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      if (userData.savedJobs) {
        setSavedJobs(userData.savedJobs);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      const { token: newToken, user: userData } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', newToken);
      
      // Set auth state
      setToken(newToken);
      setUser(userData);
      
      // Set default auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data
    setUser(null);
    setToken(null);
    setSavedJobs([]);
    
    // Remove from local storage
    localStorage.removeItem('token');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!token) throw new Error('Not authenticated');
    
    try {
      setIsLoading(true);
      const response = await axios.put(`${API_URL}/user/profile`, userData);
      
      if (response.data.success && user) {
        setUser({ ...user, ...userData });
      }
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveJob = async (jobId: string, title: string, company: string) => {
    if (!token) throw new Error('Not authenticated');
    
    try {
      const response = await axios.post(`${API_URL}/user/save-job`, { jobId, title, company });
      
      if (response.data.success) {
        setSavedJobs(response.data.savedJobs);
      }
      return response.data;
    } catch (error) {
      console.error('Save job error:', error);
      throw error;
    }
  };

  const unsaveJob = async (jobId: string) => {
    if (!token) throw new Error('Not authenticated');
    
    try {
      const response = await axios.delete(`${API_URL}/user/saved-jobs/${jobId}`);
      
      if (response.data.success) {
        setSavedJobs(response.data.savedJobs);
      }
      return response.data;
    } catch (error) {
      console.error('Unsave job error:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    updateProfile,
    savedJobs,
    saveJob,
    unsaveJob,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   subscribed: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   updateProfile: (userData: Partial<User>) => Promise<void>;
//   savedJobs: string[];
//   saveJob: (jobId: string) => void;
//   unsaveJob: (jobId: string) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [savedJobs, setSavedJobs] = useState<string[]>([]);

//   useEffect(() => {
//     // Check for saved user data in localStorage
//     const savedUser = localStorage.getItem('user');
//     const savedJobsList = localStorage.getItem('savedJobs');
    
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
    
//     if (savedJobsList) {
//       setSavedJobs(JSON.parse(savedJobsList));
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     // Mock login - in real app, this would call your backend
//     const mockUser = {
//       id: '1',
//       name: 'John Doe',
//       email,
//       subscribed: false
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('user', JSON.stringify(mockUser));
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     // Mock signup - in real app, this would call your backend
//     const mockUser = {
//       id: Date.now().toString(),
//       name,
//       email,
//       subscribed: false
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('user', JSON.stringify(mockUser));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('savedJobs');
//     setSavedJobs([]);
//   };

//   const updateProfile = async (userData: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...userData };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   const saveJob = (jobId: string) => {
//     const newSavedJobs = [...savedJobs, jobId];
//     setSavedJobs(newSavedJobs);
//     localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
//   };

//   const unsaveJob = (jobId: string) => {
//     const newSavedJobs = savedJobs.filter(id => id !== jobId);
//     setSavedJobs(newSavedJobs);
//     localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
//   };

//   const value = {
//     user,
//     login,
//     signup,
//     logout,
//     updateProfile,
//     savedJobs,
//     saveJob,
//     unsaveJob
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
