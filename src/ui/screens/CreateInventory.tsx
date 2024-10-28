import React, { useState, memo } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenProps, useAppNavigation } from '../../navigation/types';
import { storeItem, getItem } from '../../utils/helpers';
import { ItemType } from './InventoryList';
import {Layout} from '../components/Layout';

export const CreateInventory: React.FC<ScreenProps<"CreateInventory">> = memo(({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const validateForm = async () => {
    if (!name || !price || !stock || !description) {
      Alert.alert('All fields are required.');
      return false;
    }

    const existingInventory = await getItem('inventory');
    if (existingInventory?.some((item: ItemType) => item.name === name)) {
      Alert.alert('Name must be unique.');
      return false;
    }

    if (isNaN(Number(price)) || isNaN(Number(stock))) {
      Alert.alert('Price and Stock must be numbers.');
      return false;
    }

    if (description.split(' ')?.length < 3) {
      Alert.alert('Description must have at least 3 words.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const newItem = { name, price, stock, description };
    const inventory = (await getItem('inventory')) || [];
    inventory.push(newItem);
    await storeItem('inventory', inventory);
    navigation.navigate('InventoryList');
  };

  return (
    <Layout title={'Create Inventory'}>
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
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Total Stock"
          value={stock}
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
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
