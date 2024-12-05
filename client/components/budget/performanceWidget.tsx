import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { EllipsisVertical } from 'lucide-react-native';
import colorPalette from '@/app/utils/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,  
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Performance</Text>
          <Pressable 
              style={({ hovered }: WebPressableCallBackType) => [
                styles.menuButton,
                hovered && styles.menuButtonHovered
              ]}
              // onPress={() => setIsModalVisible(true)}
            >
              <EllipsisVertical size={13} color={colorPalette.light} />
            </Pressable>
        </View>
        <Text style={styles.subtitle}>Your budget performance so far this year.</Text>
      </View>
      
      
      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <Bar data={performanceData} options={performanceOptions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.medium,
    borderRadius: 25,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  titleContainer: {
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
    padding: 8,
    borderRadius: 8,
  },
  menuButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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