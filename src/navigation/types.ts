import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { ItemType } from "../ui/screens";

export type RootStackParamList = {
    EditInventory: {item: ItemType};
    InventoryList: undefined;
    CreateInventory: undefined;
}

// Type for useNavigation hook
export type NavigationProps = NavigationProp<RootStackParamList>;

// Type for navigation prop in components
export type ScreenNavigationProp<T extends keyof RootStackParamList> = NavigationProp<
  RootStackParamList,
  T
>;

// Type for route prop in components
export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// 4. Create type-safe props interface for screens
export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: ScreenNavigationProp<T>;
  route: ScreenRouteProp<T>;
}

// 6. Type-safe navigation hook usage
export const useAppNavigation = () => useNavigation<NavigationProps>();