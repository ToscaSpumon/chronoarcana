'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GraphType, Timeframe } from '@/types';
import { CHART_COLORS } from '@/utils/constants';

interface UserSettingsContextType {
  // Graph customization
  preferredGraphType: GraphType;
  setPreferredGraphType: (type: GraphType) => void;
  
  preferredTimeframe: Timeframe;
  setPreferredTimeframe: (timeframe: Timeframe) => void;
  
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  
  // Theme preferences (future expansion)
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  
  // Deck preferences
  preferredDeckId: number | null;
  setPreferredDeckId: (deckId: number | null) => void;
  
  // Reset all settings to defaults
  resetToDefaults: () => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

const DEFAULT_SETTINGS = {
  preferredGraphType: 'bar' as GraphType,
  preferredTimeframe: 'month' as Timeframe,
  selectedColors: CHART_COLORS.PRIMARY,
  isDarkMode: true, // Always dark mode for ChronoArcana
  preferredDeckId: null,
};

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferredGraphType, setPreferredGraphType] = useState<GraphType>(DEFAULT_SETTINGS.preferredGraphType);
  const [preferredTimeframe, setPreferredTimeframe] = useState<Timeframe>(DEFAULT_SETTINGS.preferredTimeframe);
  const [selectedColors, setSelectedColors] = useState<string[]>(DEFAULT_SETTINGS.selectedColors);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(DEFAULT_SETTINGS.isDarkMode);
  const [preferredDeckId, setPreferredDeckId] = useState<number | null>(DEFAULT_SETTINGS.preferredDeckId);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('chronoarcana-user-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setPreferredGraphType(parsed.preferredGraphType || DEFAULT_SETTINGS.preferredGraphType);
          setPreferredTimeframe(parsed.preferredTimeframe || DEFAULT_SETTINGS.preferredTimeframe);
          setSelectedColors(parsed.selectedColors || DEFAULT_SETTINGS.selectedColors);
          setIsDarkMode(parsed.isDarkMode ?? DEFAULT_SETTINGS.isDarkMode);
          setPreferredDeckId(parsed.preferredDeckId || DEFAULT_SETTINGS.preferredDeckId);
        } catch (error) {
          console.error('Failed to parse user settings from localStorage:', error);
        }
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const settings = {
        preferredGraphType,
        preferredTimeframe,
        selectedColors,
        isDarkMode,
        preferredDeckId,
      };
      localStorage.setItem('chronoarcana-user-settings', JSON.stringify(settings));
    }
  }, [preferredGraphType, preferredTimeframe, selectedColors, isDarkMode, preferredDeckId]);

  const resetToDefaults = () => {
    setPreferredGraphType(DEFAULT_SETTINGS.preferredGraphType);
    setPreferredTimeframe(DEFAULT_SETTINGS.preferredTimeframe);
    setSelectedColors(DEFAULT_SETTINGS.selectedColors);
    setIsDarkMode(DEFAULT_SETTINGS.isDarkMode);
    setPreferredDeckId(DEFAULT_SETTINGS.preferredDeckId);
  };

  const value: UserSettingsContextType = {
    preferredGraphType,
    setPreferredGraphType,
    preferredTimeframe,
    setPreferredTimeframe,
    selectedColors,
    setSelectedColors,
    isDarkMode,
    setIsDarkMode,
    preferredDeckId,
    setPreferredDeckId,
    resetToDefaults,
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
};
