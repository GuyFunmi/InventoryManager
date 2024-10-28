import React, { memo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Layout =  memo(
    ({ children, showBackButton = false, title = '' }: {children: ReactNode, showBackButton?: boolean, title: string}) => {
        const navigation = useNavigation();
        const insets = useSafeAreaInsets();
      
        return (
          <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
            
            {showBackButton && (
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
            
            {children}
          </View>
        );
      }
);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    backButton: {
      padding: 12,
      backgroundColor: '#ccc',
      borderRadius: 8,
      margin: 16,
      alignSelf: 'flex-start',
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
    },
    
  });
  