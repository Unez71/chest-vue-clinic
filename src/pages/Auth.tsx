import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen auth-page relative overflow-hidden">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>
        <div className="gradient-waves">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8 fade-in-up">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              ChestAI
            </h1>
            <p className="text-gray-400 text-sm">Advanced Chest X-Ray Diagnostics</p>
          </div>

          {/* Auth Card */}
          <Card className="auth-card glass-card-dark border-white/10 backdrop-blur-xl bg-black/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {isLogin 
                  ? 'Sign in to access your diagnostic dashboard'
                  : 'Join us to start analyzing chest X-rays'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="floating-label-group">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="auth-input peer"
                      placeholder=" "
                      required
                    />
                    <Label htmlFor="name" className="floating-label">
                      Full Name
                    </Label>
                  </div>
                )}

                <div className="floating-label-group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="auth-input peer"
                    placeholder=" "
                    required
                  />
                  <Label htmlFor="email" className="floating-label">
                    Email Address
                  </Label>
                </div>

                <div className="floating-label-group">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="auth-input peer"
                    placeholder=" "
                    required
                  />
                  <Label htmlFor="password" className="floating-label">
                    Password
                  </Label>
                </div>

                {!isLogin && (
                  <div className="floating-label-group">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="auth-input peer"
                      placeholder=" "
                      required
                    />
                    <Label htmlFor="confirmPassword" className="floating-label">
                      Confirm Password
                    </Label>
                  </div>
                )}

                <Button type="submit" className="auth-button w-full">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              {/* Toggle Auth Mode */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="auth-toggle-link mt-2"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </div>

              {isLogin && (
                <div className="text-center">
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    Forgot your password?
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;