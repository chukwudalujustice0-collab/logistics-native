import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme/theme';
import Header from '../../components/common/Header';

const OrderHistory = ({ navigation }) => {
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      earnings: '₦1,500',
      status: 'delivered',
      destination: '456 Oak Ave, Lagos',
    },
    {
      id: 'ORD002',
      date: '2024-01-14',
      earnings: '₦2,000',
      status: 'delivered',
      destination: '789 Elm St, Lagos',
    },
  ]);

  const OrderHistoryItem = ({ order }) => (
    <TouchableOpacity style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <View style={styles.orderTop}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.earnings}>{order.earnings}</Text>
        </View>
        <Text style={styles.destination}>{order.destination}</Text>
        <Text style={styles.date}>{order.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.colors.success}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Order History" showBackButton onBackPress={() => navigation.goBack()} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderHistoryItem order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  orderItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  orderInfo: {
    flex: 1,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderId: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  earnings: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  destination: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginVertical: 4,
  },
  date: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
  },
  statusContainer: {
    marginLeft: theme.spacing.md,
  },
});

export default OrderHistory;
