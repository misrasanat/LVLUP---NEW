import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import QuestsScreen from './screens/QuestsScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'friends', 'quests'

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }

    switch (currentScreen) {
      case 'friends':
        return <FriendsScreen onBack={() => setCurrentScreen('home')} />;
      case 'quests':
        return <QuestsScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return (
          <HomeScreen 
            onLogout={() => setIsLoggedIn(false)} 
            onNavigateToFriends={() => setCurrentScreen('friends')}
            onNavigateToQuests={() => setCurrentScreen('quests')}
          />
        );
    }
  };

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
