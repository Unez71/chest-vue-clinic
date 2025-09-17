import { useState, useEffect } from "react";
import { Home, Upload, Settings, LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    setIsAuthenticated(auth === 'true');
    setUserEmail(email || '');
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };
  
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "upload", icon: Upload, label: "Upload" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-nav rounded-2xl px-6 py-3">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative flex items-center px-4 py-2 rounded-xl transition-all duration-300 ease-out
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(211_100%_50%_/_0.3)]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className={`ml-2 text-sm font-medium transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 w-0 ml-0"
                }`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-primary/10 animate-pulse" />
                )}
              </button>
            );
          })}
          
          {/* Auth Button */}
          <div className="ml-4 pl-4 border-l border-white/20">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center px-3 py-2 rounded-xl bg-primary/10">
                  <User className="h-4 w-4 text-primary mr-2" />
                  <span className="text-xs text-primary font-medium">{userEmail}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 rounded-xl transition-all duration-300 ease-out text-muted-foreground hover:text-foreground hover:bg-white/50 hover:scale-105"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2 text-sm font-medium">
                    Sign Out
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center px-4 py-2 rounded-xl transition-all duration-300 ease-out text-muted-foreground hover:text-foreground hover:bg-white/50 hover:scale-105"
              >
                <LogIn className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">
                  Sign In
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};