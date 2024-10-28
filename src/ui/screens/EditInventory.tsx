import React, { useState, memo } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { getItem, updateItem, deleteItem } from '../../utils/helpers';
import { ScreenProps } from '../../navigation/types';
import { ItemType } from './InventoryList';
import {Layout} from '../components/Layout';

export const EditInventory: React.FC<ScreenProps<"EditInventory">> = memo(({navigation, route}) => {
  const item = (route as { params: { item: ItemType } })?.params?.item;

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [stock, setStock] = useState(item.stock);
  const [description, setDescription] = useState(item.description);
  const [originalName, setOriginalName] = useState(item.name);

  const validateForm = async () => {
    if (!name || !price || !stock || !description) {
      Alert.alert('All fields are required.');
      return false;
    }

    const existingInventory: ItemType[] = await getItem('inventory');
    if (name !== originalName && existingInventory?.some((inv) => inv.name === name)) {
      Alert.alert('Name must be unique.');
      return false;
    }

    if (isNaN(Number(price)) || isNaN(Number(stock))) {
      Alert.alert('Price and Stock must be numbers.');
      return false;
    }

    if (description.split(' ').length < 3) {
      Alert.alert('Description must have at least 3 words.');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const updatedItem = { name, price, stock, description };
    const inventory: ItemType[] = await getItem('inventory');
    const updatedInventory = inventory.map((inv) =>
      inv.name === originalName ? updatedItem : inv
    );
    await updateItem('inventory', updatedInventory);

    navigation.navigate('InventoryList');
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            const inventory: ItemType[] = await getItem('inventory');
            const updatedInventory = inventory.filter((inv) => inv.name !== originalName);
            await deleteItem('inventory');
            await updateItem('inventory', updatedInventory);

            navigation.navigate('InventoryList');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Layout showBackButton title={'Edit Inventory'}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price.toString()}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Total Stock"
          value={stock.toString()}
          onChangeText={setStock}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  deleteButton: {
    paddingVertical: 12,
    borderWidth: 0.2,
    borderColor: '#3c3c3c',
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ff4d4d',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
