'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/common/Button';
import { validateEmail, validatePassword, validateUsername } from '@/utils/validation';

interface AuthFormsProps {
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
  onSuccess?: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ mode, onModeChange, onSuccess }) => {
  const { signIn, signUp, loading } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup') {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    // Signup specific validations
    if (mode === 'signup') {
      // Username validation
      if (!username) {
        newErrors.username = 'Username is required';
      } else {
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
          newErrors.username = usernameValidation.errors[0];
        }
      }

      // Confirm password validation
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      console.log('Starting authentication process for mode:', mode);
      if (mode === 'signin') {
        console.log('Attempting sign in for email:', email);
        await signIn(email, password);
        console.log('Sign in successful');
      } else {
        console.log('Attempting sign up for email:', email, 'username:', username);
        await signUp(email, password, username);
        console.log('Sign up successful');
      }
      
      console.log('Authentication completed, calling onSuccess');
      onSuccess?.();
    } catch (error) {
      console.error('Authentication error:', error);
      
      let errorMessage = 'An error occurred during authentication';
      
      if (error instanceof Error) {
        if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in. Check your spam folder if you don\'t see it.';
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrors({
        form: errorMessage,
      });
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel font-bold text-lunar-glow mb-2">
          {mode === 'signin' ? 'Welcome Back' : 'Join ChronoArcana'}
        </h2>
        <p className="text-lunar-glow opacity-70">
          {mode === 'signin' 
            ? 'Sign in to continue your journey' 
            : 'Begin your mystical journey today'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username field (signup only) */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-lunar-glow mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearErrors();
              }}
              className="input w-full"
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-crimson-stain">{errors.username}</p>
            )}
          </div>
        )}

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-lunar-glow mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrors();
            }}
            className="input w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-crimson-stain">{errors.email}</p>
          )}
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-lunar-glow mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrors();
              }}
              className="input w-full pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lunar-glow opacity-70 hover:opacity-100"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-crimson-stain">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password field (signup only) */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-lunar-glow mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearErrors();
              }}
              className="input w-full"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-crimson-stain">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        {/* Email confirmation notice for signup */}
        {mode === 'signup' && (
          <div className="text-sm text-lunar-glow opacity-70 bg-midnight-aura p-3 rounded-lg">
            <p>📧 After signing up, you'll receive a confirmation email. Please check your inbox (and spam folder) and click the confirmation link before signing in.</p>
          </div>
        )}

        {/* Form error */}
        {errors.form && (
          <div className="text-center">
            <p className="text-sm text-crimson-stain">{errors.form}</p>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      {/* Mode toggle */}
      <div className="mt-8 text-center">
        <p className="text-lunar-glow opacity-70">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <button
          type="button"
          onClick={() => {
            onModeChange(mode === 'signin' ? 'signup' : 'signin');
            setErrors({});
          }}
          className="mt-2 text-astral-gold hover:text-astral-gold font-semibold transition-colors"
        >
          {mode === 'signin' ? 'Sign up here' : 'Sign in here'}
        </button>
      </div>
    </div>
  );
};

export default AuthForms;