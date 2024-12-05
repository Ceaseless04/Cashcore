import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        <Text style={styles.title}>Upcoming Payments</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>•••</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>Payments due this month.</Text>
      
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