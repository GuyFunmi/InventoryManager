import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { EditInventory } from '../ui/screens';
import { ScreenRouteProp } from '../navigation/types';
import React from 'react';

// Mock AsyncStorage for Jest
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));


// Mock test item
const mockItem = {
  name: 'Test Item',
  price: '10.99',
  stock: '100',
  description: 'This is a test item description',
};

// Mock navigation with required properties
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

// Mock route with required properties
const mockRoute: ScreenRouteProp<'EditInventory'> = {
  key: 'EditInventory-123',
  name: 'EditInventory',
  params: { item: mockItem }
};

// Mock Layout component
jest.mock('../ui/components/Layout', () => {
  return {
    __esModule: true,
    Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('EditInventory', () => {
  // 1. Snapshot test
  it('should match snapshot', () => {
    const result = render(
      <EditInventory 
        navigation={mockNavigation}
        route={mockRoute}
      />
    );
    expect(result).toMatchSnapshot();
  });

  // 2. Delete confirmation dialog test
  it('should show confirmation dialog when delete button is pressed', () => {
    const { getByText } = render(
      <EditInventory 
        navigation={mockNavigation}
        route={mockRoute}
      />
    );
    
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: expect.any(Function),
        },
      ],
      { cancelable: true }
    );
  });
});