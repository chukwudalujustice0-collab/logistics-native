import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme/theme';
import Header from '../../components/common/Header';
import OrderCard from '../../components/orders/OrderCard';

const BulkOrders = ({ navigation }) => {
  const [orders] = useState([
    {
      id: 'ORD001',
      pickupLocation: 'Warehouse A, Lagos',
      deliveryLocation: 'Multiple Locations',
      status: 'pending',
      rider: null,
      riderRating: 0,
      timestamp: new Date(),
    },
    {
      id: 'ORD002',
      pickupLocation: 'Warehouse B, Lagos',
      deliveryLocation: 'Ikoyi, Lagos',
      status: 'in_transit',
      rider: 'John Doe',
      riderRating: 4.8,
      timestamp: new Date(),
    },
  ]);

  return (
    <View style={styles.container}>
      <Header
        title="Bulk Orders"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
          />
        )}
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
});

export default BulkOrders;
