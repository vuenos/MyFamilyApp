import React from 'react';
import {View, Pressable} from 'react-native';
import {useTheme, Button} from 'react-native-paper';
import {ScreenStyles} from '../styles/ScreenStyles.ts';

export default function GetStared() {
  const theme = useTheme();
  const styles = ScreenStyles(theme);

  const handleCreateFamilyGroup = async () => {
    console.log('가족 그룹 만들기');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleCreateFamilyGroup}>
        <Button icon="account-multiple-plus">Get Started</Button>
      </Pressable>
    </View>
  );
}
