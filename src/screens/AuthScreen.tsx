import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ScreenStyles} from '../styles/ScreenStyles.ts';

export default function AuthScreen() {
  const theme = useTheme();
  const styles = ScreenStyles(theme);

  const authGoogleRequest = async () => {
    console.log('구글 로그인 요청');
  };

  const authKakaoRequest = async () => {
    console.log('카카오톡 로그인 요청');
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => authGoogleRequest()}>
          <Text>Google 로그인</Text>
        </Pressable>
        <Pressable onPress={() => authKakaoRequest()}>
          <Text>카카오톡 로그인</Text>
        </Pressable>
      </View>
    </View>
  );
}
