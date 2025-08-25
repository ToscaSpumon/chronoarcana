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
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, username);
      }
      
      onSuccess?.();
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'An error occurred',
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-lunar-glow opacity-70 hover:opacity-100"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-crimson-stain">{errors.password}</p>
          )}
        </div>        {/* Confirm Password field (signup only) */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-lunar-glow mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
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