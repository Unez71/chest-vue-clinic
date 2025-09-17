import { useState } from "react";
import { Monitor, Moon, Sun, Type, Palette } from "lucide-react";

export const SettingsSection = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontStyle, setFontStyle] = useState<'default' | 'modern' | 'elegant'>('default');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleFontChange = (newFont: 'default' | 'modern' | 'elegant') => {
    setFontStyle(newFont);
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, '')
      .concat(` font-${newFont}`);
  };

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

          {/* Font Style Settings */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center mb-4">
              <Type className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Font Style</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleFontChange('default')}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  fontStyle === 'default'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-lg font-medium mb-1">Aa</div>
                <div className="text-xs">Default</div>
              </button>
              
              <button
                onClick={() => handleFontChange('modern')}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  fontStyle === 'modern'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-lg font-bold mb-1 font-mono">Aa</div>
                <div className="text-xs">Modern</div>
              </button>
              
              <button
                onClick={() => handleFontChange('elegant')}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  fontStyle === 'elegant'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-lg font-light mb-1 font-serif">Aa</div>
                <div className="text-xs">Elegant</div>
              </button>
            </div>
          </div>

          {/* User Preferences */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center mb-4">
              <Monitor className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Display Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Contrast Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Large Text Size</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reduced Motion</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};