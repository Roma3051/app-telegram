/* eslint-disable react-native/no-inline-styles */
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/app-navigator';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
