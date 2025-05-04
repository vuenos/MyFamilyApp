import React, {useState} from 'react';
import {Text, View, Pressable, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ScreenStyles} from '../styles/ScreenStyles.ts';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  serviceTerms as getKakaoServiceTerms,
  unlink,
} from '@react-native-seoul/kakao-login';

export default function AuthScreen() {
  const theme = useTheme();
  const styles = ScreenStyles(theme);
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();

      setResult(JSON.stringify(profile));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getShippingAddresses = async (): Promise<void> => {
    try {
      const shippingAddresses = await getKakaoShippingAddresses();

      setResult(JSON.stringify(shippingAddresses));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getServiceTerms = async (): Promise<void> => {
    try {
      const serviceTerms = await getKakaoServiceTerms();

      setResult(JSON.stringify(serviceTerms));
    } catch (err) {
      console.error('serviceTerms error', err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <ScrollView>
          <Text>{result}</Text>
          <View style={{height: 100}} />
        </ScrollView>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}>
        <Text style={styles.text}>카카오 로그인</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getProfile()}>
        <Text style={styles.text}>프로필 조회</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getShippingAddresses()}>
        <Text style={styles.text}>배송주소록 조회</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getServiceTerms()}>
        <Text style={styles.text}>서비스 약관 동의 내역 확인</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => unlinkKakao()}>
        <Text style={styles.text}>링크 해제</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => signOutWithKakao()}>
        <Text style={styles.text}>카카오 로그아웃</Text>
      </Pressable>
    </View>
  );
}
