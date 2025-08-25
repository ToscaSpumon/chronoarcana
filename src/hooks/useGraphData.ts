import { useState, useEffect, useMemo } from 'react';
import { DailyPull, PullAnalytics, ChartData, Timeframe } from '@/types';
import { CHART_COLORS } from '@/utils/constants';

export const useGraphData = (
  pulls: DailyPull[],
  timeframe: Timeframe,
  colors: string[] = [...CHART_COLORS.PRIMARY]
) => {
  const [loading, setLoading] = useState(false);

  // Filter pulls based on timeframe
  const filteredPulls = useMemo(() => {
    if (!pulls.length) return [];
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeframe) {
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        return pulls;
    }
    
    return pulls.filter(pull => new Date(pull.pull_date) >= filterDate);
  }, [pulls, timeframe]);

  // Calculate analytics data
  const analytics = useMemo((): PullAnalytics[] => {
    if (!filteredPulls.length) return [];
    
    const cardCounts = filteredPulls.reduce((acc, pull) => {
      const cardName = pull.card?.card_name || 'Unknown Card';
      acc[pull.card_id] = {
        cardId: pull.card_id,
        cardName,
        count: (acc[pull.card_id]?.count || 0) + 1,
      };
      return acc;
    }, {} as Record<number, { cardId: number; cardName: string; count: number }>);
    
    const total = filteredPulls.length;
    
    return Object.values(cardCounts)
      .map(({ cardId, cardName, count }) => ({
        cardId,
        cardName,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredPulls]);

  // Generate chart data for Chart.js
  const chartData = useMemo((): ChartData => {
    const topCards = analytics.slice(0, 10); // Show top 10 cards
    
    return {
      labels: topCards.map(card => card.cardName),
      datasets: [
        {
          label: 'Times Pulled',
          data: topCards.map(card => card.count),
          backgroundColor: colors.map((color, index) => 
            index < topCards.length ? color + '80' : color + '40'
          ),
          borderColor: colors.map((color, index) => 
            index < topCards.length ? color : color + '60'
          ),
          borderWidth: 2,
        },
      ],
    };
  }, [analytics, colors]);

  // Get summary stats
  const summaryStats = useMemo(() => {
    if (!analytics.length) return null;
    
    const mostPulled = analytics[0];
    const totalPulls = filteredPulls.length;
    const uniqueCards = analytics.length;
    
    return {
      mostPulled,
      totalPulls,
      uniqueCards,
      averagePullsPerCard: Math.round(totalPulls / uniqueCards * 10) / 10,
    };
  }, [analytics, filteredPulls]);

  return {
    analytics,
    chartData,
    summaryStats,
    loading,
    hasData: filteredPulls.length > 0,
  };
};
