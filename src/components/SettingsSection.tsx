import { useState, useEffect } from "react";
import { Moon, Sun, Palette } from "lucide-react";

export const SettingsSection = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme on component mount
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Store preference in localStorage
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Settings</h2>
          <p className="text-muted-foreground">
            Customize your diagnostic assistant experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center mb-4">
              <Palette className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Theme Preference</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  theme === 'light'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Sun className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Light Theme</div>
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Moon className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Dark Theme</div>
              </button>
            </div>
          </div>

          {/* Additional Settings Placeholder */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">Additional Settings</h3>
              <p className="text-muted-foreground">Adding Soon...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};