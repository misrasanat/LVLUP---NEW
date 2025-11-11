import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { Feather } from '@expo/vector-icons';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const auth = getAuth(app);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
      onLogin();
    } catch (error) {
      console.log(error);
      setLoginError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in");
      onLogin();
    } catch (error) {
      console.log(error.code);
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundGrid}>
        {[...Array(20)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { 
            top: i * 40,
            opacity: 0.1 
          }]} />
        ))}
        {[...Array(10)].map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLineVertical, { 
            left: i * 40,
            opacity: 0.1 
          }]} />
        ))}
      </View>

      {/* Floating Elements */}
      <View style={styles.floatingElement1} />
      <View style={styles.floatingElement2} />
      <View style={styles.floatingElement3} />

      <Animated.View style={[styles.content, { 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>LVL</Text>
            <Text style={styles.appTitleAccent}>UP</Text>
            <View style={styles.glowDot} />
          </View>
          <Text style={styles.subtitle}>Level Up Your Life</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            <Feather name="zap" size={20} color="#00d4ff" /> Access Portal
          </Text>

          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {loginError ? (
            <View style={styles.errorContainer}>
              <Feather name="alert-circle" size={16} color="#ff6b35" />
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Feather name="log-in" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Initialize Session</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
            <Feather name="user-plus" size={20} color="#00d4ff" />
            <Text style={styles.secondaryButtonText}>Create New Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Join the Shadow Hunters</Text>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>v1.0.0 - Beta</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    position: 'relative',
  },
  backgroundGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#00d4ff',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#00d4ff',
  },
  floatingElement1: {
    position: 'absolute',
    top: 100,
    right: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  floatingElement2: {
    position: 'absolute',
    bottom: 200,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  floatingElement3: {
    position: 'absolute',
    top: 300,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  appTitleAccent: {
    fontSize: 48,
    fontWeight: '900',
    color: '#00d4ff',
    letterSpacing: 3,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginLeft: 5,
  },
  glowDot: {
    position: 'absolute',
    top: -5,
    right: -15,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7c3aed',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#0088cc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  errorText: {
    color: '#ff6b35',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#00d4ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7c3aed',
  },
  secondaryButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  versionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  versionText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});