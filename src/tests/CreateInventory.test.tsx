import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { CreateInventory } from '../ui/screens';
import React from 'react';
import { ScreenRouteProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

// Mock navigation
const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  getId: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  getState: jest.fn(),
};

// Mock route
const mockRoute: ScreenRouteProp<'CreateInventory'> = {
  key: 'CreateInventory-123',
  name: 'CreateInventory',
  params: undefined,
};

// Mock Layout component
jest.mock('../ui/components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('CreateInventory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const result = render(<CreateInventory navigation={mockNavigation} route={mockRoute} />);
    expect(result).toMatchSnapshot();
  });

  it('should submit the form when valid data is entered', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CreateInventory navigation={mockNavigation} route={mockRoute} />
    );

    const nameInput = getByPlaceholderText('Name');
    const priceInput = getByPlaceholderText('Price');
    const stockInput = getByPlaceholderText('Total Stock');
    const descriptionInput = getByPlaceholderText('Description');

    fireEvent.changeText(nameInput, 'Test Item');
    fireEvent.changeText(priceInput, '20.00');
    fireEvent.changeText(stockInput, '50');
    fireEvent.changeText(descriptionInput, 'This is a valid description.');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(mockNavigation.navigate).toHaveBeenCalledWith('InventoryList');
    });
  });
});