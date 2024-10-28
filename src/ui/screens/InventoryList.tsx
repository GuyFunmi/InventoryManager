import { useFocusEffect } from '@react-navigation/native';
import React, { memo, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../../navigation/types';
import { getItem } from '../../utils/helpers';
import { Layout } from '../components/Layout';

export type ItemType = {
  name: string;
  price: string;
  stock: string;
  description: string;
};

export const InventoryList = memo(({navigation}: ScreenProps<"InventoryList">) => {
  const [inventory, setInventory] = useState<ItemType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getItem('inventory');
        if (data) setInventory(data);
      };

      fetchData();
    }, [navigation])
  );

  return (
    <Layout title={'Inventory List'}>
      <View style={styles.container}>
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>Name: {item.name}</Text>
              <Text style={styles.itemDetail}>Price: {item.price}</Text>
              <Text style={styles.itemDetail}>Total Stock: {item.stock}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditInventory', { item })}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateInventory')}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
