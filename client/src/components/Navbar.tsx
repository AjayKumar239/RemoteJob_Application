
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RemoteGigs</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 font-medium ${
                location.pathname === '/' ? 'text-blue-600' : ''
              }`}
            >
              Start a Search
            </Link>
            <Link 
              to="/jobs" 
              className={`text-gray-700 hover:text-blue-600 font-medium ${
                location.pathname === '/jobs' ? 'text-blue-600' : ''
              }`}
            >
              Job List
            </Link>
            <Link 
              to="/salary" 
              className={`text-gray-700 hover:text-blue-600 font-medium ${
                location.pathname === '/salary' ? 'text-blue-600' : ''
              }`}
            >
              Salary Estimate
            </Link>
            <Link 
              to="/pricing" 
              className={`text-gray-700 hover:text-blue-600 font-medium ${
                location.pathname === '/pricing' ? 'text-blue-600' : ''
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name}</span>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant={location.pathname === "/login" ? "default" : "outline"} 
                    size="sm"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant={location.pathname === "/signup" ? "default" : "outline"} 
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
