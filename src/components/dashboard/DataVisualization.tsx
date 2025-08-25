'use client';

import React from 'react';
import { BarChart3, PieChart, Palette, Calendar } from 'lucide-react';
import { DailyPull, GraphType, Timeframe } from '@/types';
import { useGraphData } from '@/hooks/useGraphData';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import Button from '@/components/common/Button';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { CHART_COLORS } from '@/utils/constants';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DataVisualizationProps {
  pulls: DailyPull[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ pulls }) => {
  const {
    preferredGraphType,
    setPreferredGraphType,
    preferredTimeframe,
    setPreferredTimeframe,
    selectedColors,
    setSelectedColors,
  } = useUserSettings();

  const { analytics, chartData, summaryStats, hasData } = useGraphData(
    pulls,
    preferredTimeframe,
    selectedColors
  );

  const handleGraphTypeChange = (type: GraphType) => {
    setPreferredGraphType(type);
  };

  const handleTimeframeChange = (timeframe: Timeframe) => {
    setPreferredTimeframe(timeframe);
  };

  const handleColorSchemeChange = (colors: readonly string[]) => {
    setSelectedColors([...colors]);
  };

  if (!hasData) {
    return (
      <div className="card text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-sapphire-haze bg-opacity-20 rounded-full flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-sapphire-haze" />
        </div>
        <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-2">
          Analytics Coming Soon
        </h3>
        <p className="text-lunar-glow opacity-70">
          Pull more cards to unlock insights and patterns in your readings.
        </p>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#F0F0F5',
          font: {
            family: 'Inter',
          },
        },
      },
      tooltip: {
        backgroundColor: '#1A1A2B',
        titleColor: '#F0F0F5',
        bodyColor: '#F0F0F5',
        borderColor: '#B89C6F',
        borderWidth: 1,
      },
    },
    scales: preferredGraphType === 'bar' ? {
      x: {
        ticks: {
          color: '#F0F0F5',
          font: {
            family: 'Inter',
          },
        },
        grid: {
          color: '#2C2C3A',
        },
      },
      y: {
        ticks: {
          color: '#F0F0F5',
          font: {
            family: 'Inter',
          },
        },
        grid: {
          color: '#2C2C3A',
        },
      },
    } : undefined,
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4 sm:mb-0">
          Your Patterns
        </h3>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-lunar-glow opacity-70" />
            <select
              value={preferredTimeframe}
              onChange={(e) => handleTimeframeChange(e.target.value as Timeframe)}
              className="input text-sm py-1 px-2"
            >
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Graph Type Selector */}
          <div className="flex bg-midnight-aura rounded-lg p-1">
            <Button
              variant={preferredGraphType === 'bar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleGraphTypeChange('bar')}
              className="px-3 py-1"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant={preferredGraphType === 'pie' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleGraphTypeChange('pie')}
              className="px-3 py-1"
            >
              <PieChart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {summaryStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-midnight-aura rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-astral-gold">
              {summaryStats.totalPulls}
            </div>
            <div className="text-sm text-lunar-glow opacity-70">Total Pulls</div>
          </div>
          
          <div className="bg-midnight-aura rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amethyst-dream">
              {summaryStats.uniqueCards}
            </div>
            <div className="text-sm text-lunar-glow opacity-70">Unique Cards</div>
          </div>
          
          <div className="bg-midnight-aura rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-emerald-whisper">
              {summaryStats.mostPulled.cardName}
            </div>
            <div className="text-sm text-lunar-glow opacity-70">Most Pulled</div>
          </div>
          
          <div className="bg-midnight-aura rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-sapphire-haze">
              {summaryStats.averagePullsPerCard}
            </div>
            <div className="text-sm text-lunar-glow opacity-70">Avg per Card</div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-80 mb-6">
        {preferredGraphType === 'bar' ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Color Scheme Selector */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-lunar-glow opacity-70 flex items-center space-x-2">
          <Palette className="w-4 h-4" />
          <span>Color Scheme</span>
        </span>
        
        <div className="flex space-x-2">
          {[CHART_COLORS.PRIMARY, CHART_COLORS.SECONDARY].map((colorScheme, index) => (
            <button
              key={index}
              onClick={() => handleColorSchemeChange(colorScheme)}
              className={`flex space-x-1 p-2 rounded-lg border-2 transition-colors ${
                JSON.stringify(selectedColors) === JSON.stringify(colorScheme)
                  ? 'border-astral-gold'
                  : 'border-midnight-aura hover:border-astral-gold'
              }`}
            >
              {colorScheme.slice(0, 4).map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;