/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#61dafb',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Android 대응
  },
  block: {
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
});

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <View style={styles.block}>
            <Text style={styles.text}>React Native !!</Text>
            <Text style={styles.text}>React Native !!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
