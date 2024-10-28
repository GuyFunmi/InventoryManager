import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { InventoryList, CreateInventory, EditInventory } from '../ui/screens';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
      <Stack.Navigator screenOptions={details => {
        const {route} = details;
        return {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          animationEnabled: false,
        };
      }}>
        <Stack.Screen name="InventoryList" component={InventoryList} />
        <Stack.Screen name="CreateInventory" component={CreateInventory} />
        <Stack.Screen name="EditInventory" component={EditInventory} />
      </Stack.Navigator>
  );
};

export default MainNavigation;
