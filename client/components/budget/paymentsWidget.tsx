import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import colorPalette from '@/app/utils/colors';
import { EllipsisVertical } from 'lucide-react-native';

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

export interface Payment {
    title: string;
    amount: number;
    status: 'pending' | 'paid';
}

interface PaymentsWidgetProps {
    upcomingPayments: Payment[];
}

const PaymentsWidget = ({upcomingPayments}: PaymentsWidgetProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Upcoming Payments</Text>
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
        <Text style={styles.subtitle}>Payments due this month.</Text>
      </View>
      
      
      {/* Payments List */}
      <View style={styles.paymentsList}>
        {upcomingPayments.map((payment, index) => (
          <View key={index} style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <View 
                style={[
                  styles.statusIndicator,
                  { backgroundColor: payment.status === 'paid' ? '#22C55E' : '#007AFF' }
                ]} 
              />
              <Text style={styles.paymentTitle}>{payment.title}</Text>
            </View>
            <Text style={styles.paymentAmount}>${payment.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 13,
    marginBottom: 16,
  },
  paymentsList: {
    gap: 12,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 4,
    height: 20,
    borderRadius: 999,
  },
  paymentTitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  paymentAmount: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default PaymentsWidget;