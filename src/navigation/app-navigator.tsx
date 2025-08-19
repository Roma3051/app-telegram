import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import ChatsScreen from '../screens/home/chats-screen';
import ChatScreen from '../screens/chat/chat-screen';
import ArchivedChatsScreen from '../screens/archived/chats-screen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    primary: colors.accent,
    border: '#222',
    notification: colors.badge,
  },
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#2c2c2e', height: 80 },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#a9a9a9',
      tabBarLabelStyle: { fontSize: 18, fontWeight: '600', marginBottom: 0 },
    }}
  >
    <Tab.Screen name="Чати" component={ChatsScreen} />
    <Tab.Screen name="Архів" component={ArchivedChatsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer theme={MyTheme}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Чат' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
