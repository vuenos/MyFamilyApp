/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';


function App(): React.JSX.Element {


  return (
    <View>
      <StatusBar
        barStyle="dark-content"
      />
      <ScrollView>

        <View>
          <Text>Hello</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
