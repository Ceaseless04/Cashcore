import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import colorPalette from '@/app/utils/colors';

ChartJS.register(
    CategoryScale,
    LinearScale,  
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

export interface performanceData {
    labels: string[];
    datasets: {
      label: 'Income' | 'Expense';
      data: number[];
      backgroundColor: string;
      borderRadius: number;
    }[];
}

interface PerformanceWidgetProps {
  performanceData: performanceData;
}


const performanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    datasets: {
      bar: {
        maxBarThickness: 40,
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          callback: function(value) {
            return value === 0 || value === 3000 || value === -3000 ? value : ''; // also adjusted to fit the max and min
          }
        },
        min: -3000, // will be adjusted to max + 100
        max: 3000, // will be adjusted to min - 100
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', //was 'left' before
        labels: {
            color: '#ffffff',
            padding: 20,
            boxWidth: 15,
            boxHeight: 15,
            usePointStyle: true,
            pointStyle: 'rectRounded',
        },
      },
    },
  };

const PerformanceWidget = ({ performanceData }: PerformanceWidgetProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Performance</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>•••</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>Your budget performance so far this year.</Text>
      
      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <Bar data={performanceData} options={performanceOptions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    backgroundColor: 'rgba(243, 244, 246, 0.7)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginBottom: 24,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default PerformanceWidget;