'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { authAPI, userAPI } from '@/lib/api';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      console.log('Refreshing profile for user:', user.id);
      const profile = await userAPI.getProfile(user.id);
      console.log('Profile loaded:', profile);
      setUserProfile(profile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    console.log('AuthContext: Getting initial session...');
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('AuthContext: Error getting initial session:', error);
      } else {
        console.log('AuthContext: Initial session result:', { 
          hasUser: !!session?.user, 
          userId: session?.user?.id,
          sessionError: error 
        });
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    console.log('AuthContext: Setting up auth state change listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthContext: Auth state change event:', event, { 
          hasUser: !!session?.user, 
          userId: session?.user?.id 
        });
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          console.log('AuthContext: User authenticated, refreshing profile...');
          await refreshProfile();
        } else {
          console.log('AuthContext: User signed out, clearing profile');
          setUserProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !userProfile) {
      refreshProfile();
    }
  }, [user]);

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      await authAPI.signUp(email, password, username);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('AuthContext: Starting sign in process');
      await authAPI.signIn(email, password);
      console.log('AuthContext: Sign in completed successfully');
    } catch (error) {
      console.error('AuthContext: Sign in failed:', error);
      throw error; // Re-throw the error so the UI can handle it
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authAPI.signOut();
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedProfile = await userAPI.updateProfile(user.id, updates);
    setUserProfile(updatedProfile);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
