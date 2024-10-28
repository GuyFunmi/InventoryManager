import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { InventoryList } from '../ui/screens/InventoryList';
import React from 'react';
import { ScreenRouteProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
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
};

// Mock route
const mockRoute: ScreenRouteProp<'InventoryList'> = {
  key: 'InventoryList-123',
  name: 'InventoryList',
  params: undefined,
};

// Mock Layout component
jest.mock('../ui/components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockInventoryData = [
  { name: 'Glock', price: '50', stock: '500', description: 'Test Item 1' },
  { name: 'Baby', price: '500', stock: '200', description: 'Test Item 2' },
];

// Mock useFocusEffect to execute callback immediately
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (callback: any) => {
      callback();
    },
    useNavigation: () => mockNavigation,
  };
});

describe('InventoryList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup AsyncStorage mock to return our test data
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockInventoryData));
  });

  it('should render inventory items and match snapshot', async () => {
    const { findByText, toJSON } = render(
      <InventoryList navigation={mockNavigation} route={mockRoute} />
    );

    // Wait for an item to appear
    await findByText('Name: Glock');
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call AsyncStorage.getItem on mount', async () => {
    render(<InventoryList navigation={mockNavigation} route={mockRoute} />);
    
    // Verify AsyncStorage.getItem was called
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('inventory');
    
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });

  it('should navigate to EditInventory when Edit button is pressed', async () => {
    const { findAllByText } = render(
      <InventoryList navigation={mockNavigation} route={mockRoute} />
    );
    // Wait for Edit buttons to appear
    const editButtons = await findAllByText('Edit');
    fireEvent.press(editButtons[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('EditInventory', {
      item: mockInventoryData[0]
    });
  });

  it('should display all item details correctly', async () => {
    const { findByText } = render(
      <InventoryList navigation={mockNavigation} route={mockRoute} />
    );

    // Verify all the data is displayed
    await findByText('Name: Glock');
    await findByText('Price: 50');
    await findByText('Total Stock: 500');
    await findByText('Name: Baby');
    await findByText('Price: 500');
    await findByText('Total Stock: 200');
  });

  it('should handle empty inventory data', async () => {
    // Mock empty data for this test
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

    const { queryByText, findByText } = render(
      <InventoryList navigation={mockNavigation} route={mockRoute} />
    );

    // Wait for component to render
    await findByText('Add Item');

    // Verify no items are rendered
    expect(queryByText(/Name: /)).toBeNull();
  });

  it('should handle null inventory data', async () => {
    // Mock null data for this test
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { queryByText, findByText } = render(
      <InventoryList navigation={mockNavigation} route={mockRoute} />
    );

    // Wait for component to render
    await findByText('Add Item');

    // Verify no items are rendered
    expect(queryByText(/Name: /)).toBeNull();
  });
});