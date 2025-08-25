'use client';

import React, { useState } from 'react';
import { Moon, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from './Button';
import { cn } from '@/utils/cn';

interface NavbarProps {
  showUserMenu?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showUserMenu = true }) => {
  const { user, userProfile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="bg-shadow-veil border-b border-midnight-aura sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-cinzel font-bold text-astral-gold">
                ChronoArcana
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          {showUserMenu && user && (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-lunar-glow">
                    Welcome, {userProfile?.username || 'User'}
                  </span>
                  {userProfile?.subscription_status === 'premium' && (
                    <span className="ml-2 px-2 py-1 text-xs bg-astral-gold text-deep-void rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          {showUserMenu && user && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {showUserMenu && user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-midnight-aura">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2">
                <div className="text-sm text-lunar-glow">
                  Welcome, {userProfile?.username || 'User'}
                </div>
                {userProfile?.subscription_status === 'premium' && (
                  <span className="mt-1 inline-block px-2 py-1 text-xs bg-astral-gold text-deep-void rounded-full">
                    Premium
                  </span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full justify-start flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;