import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, Text, View} from 'react-native';
import {AxiosError} from 'axios';
import {useTheme} from 'react-native-paper';
import {axiosInstance} from '../libs/axiosClient.ts';
import {ScreenStyles} from '../styles/ScreenStyles.ts';
import ScrollView = Animated.ScrollView;

interface FamilyMember {
  name: string;
  age: number;
  photo: string | null;
  relation: string;
  phoneNumber: string;
  birthdate: string;
  address: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  message: string;
}

export default function HomeScreen() {
  const theme = useTheme();
  const styles = ScreenStyles(theme);
  const [familyMember, setFamilyMember] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const getFamilyMembers = async () => {
    try {
      const res = await axiosInstance.get('/family');
      if (res.status === 200) {
        setFamilyMember(res.data);
        console.log('DATA::', res.data);
      }
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || error.message || '알 수 없는 오류';
      setFetchError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFamilyMembers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {isLoading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {fetchError && (
        <Text style={[styles.errorText, {color: theme.colors.error}]}>
          Error : {fetchError}
        </Text>
      )}

      {!isLoading && !fetchError && (
        <ScrollView>
          {familyMember.length > 0 ? (
            familyMember.map((member, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>Name: {member.name}</Text>
                <Text style={styles.cardText}>Age: {member.age}</Text>
                <Text style={styles.cardText}>Relation: {member.relation}</Text>
                <Text style={styles.cardText}>
                  Mobile: {member.phoneNumber}
                </Text>
                <Text style={styles.cardText}>
                  Birthday: {member.birthdate}
                </Text>
                <Text style={styles.cardText}>Address: {member.address}</Text>
                <Text style={styles.cardText}>Note: {member.note}</Text>
                <Text style={styles.cardText}>
                  createdAt:{' '}
                  {member.createdAt
                    ? new Date(member.createdAt).toLocaleString('ko-KR')
                    : 'N/A'}
                </Text>
                <Text style={styles.cardText}>
                  updatedAt:{' '}
                  {member.updatedAt
                    ? new Date(member.updatedAt).toLocaleString('ko-KR')
                    : 'N/A'}
                </Text>
              </View>
            ))
          ) : (
            <Text>가족 정보가 없습니다.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
