jest.mock('react-native-gesture-handler', () => {
    return {
      // Mock necessary functions here, like GestureHandlerRootView
      GestureHandlerRootView: ({ children }) => children,
      Swipeable: jest.fn(),
      // Add other mocks as needed
    };
  });
  