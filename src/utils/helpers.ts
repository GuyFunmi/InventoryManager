import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing item', e);
  }
};

export const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting item', e);
  }
};

export const updateItem = async (key: string, newValue: object) => {
  try {
    await storeItem(key, newValue);
  } catch (e) {
    console.error('Error updating item', e);
  }
};

export const deleteItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error deleting item', e);
  }
};
