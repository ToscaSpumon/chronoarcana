export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription_status: 'free' | 'premium';
  premium_start_date?: string;
  chosen_deck_id?: number;
  most_pulled_card_id?: number;
  last_login?: string;
}

export interface TarotDeck {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface TarotCard {
  id: number;
  deck_id: number;
  card_name: string;
  card_number?: number;
  suit?: string;
  upright_meaning: string;
  reversed_meaning?: string;
  symbol_associations?: string;
  keywords?: string;
  image_url?: string;
  created_at: string;
}

export interface DailyPull {
  id: string;
  user_id: string;
  card_id: number;
  pull_date: string;
  pull_type: 'digital' | 'physical';
  notes?: string;
  is_reversed: boolean;
  created_at: string;
  updated_at: string;
  card?: TarotCard; // Joined data
}

export interface PullAnalytics {
  cardId: number;
  cardName: string;
  count: number;
  percentage: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
}

// Dock component types
export interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export interface DockProps {
  items: DockItem[];
  className?: string;
  spring?: {
    mass: number;
    stiffness: number;
    damping: number;
  };
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}

export type SubscriptionStatus = 'free' | 'premium';
export type PullType = 'digital' | 'physical';
export type GraphType = 'bar' | 'pie';
export type Timeframe = 'month' | 'year' | 'all';
