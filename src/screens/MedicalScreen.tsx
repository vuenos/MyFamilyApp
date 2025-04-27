import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ScreenStyles} from '../styles/ScreenStyles.ts';

export default function Medical() {
  const theme = useTheme();
  const styles = ScreenStyles(theme);

  return (
    <View style={styles.container}>
      <Text>Medical</Text>
    </View>
  );
}
