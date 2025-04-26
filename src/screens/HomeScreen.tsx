import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Share,
  Touchable,
  Pressable,
} from 'react-native';
import {AxiosError} from 'axios';
import {useTheme, Avatar} from 'react-native-paper';
import {axiosInstance} from '../libs/axiosClient.ts';
import {ScreenStyles} from '../styles/ScreenStyles.ts';
import ScrollView = Animated.ScrollView;

interface FamilyMember {
  _id: string;
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

  const MemberCard = ({
    member,
    onCall,
    onEdit,
  }: {
    member: FamilyMember;
    onCall: (phoneNumber: string) => void;
    onEdit: (member: FamilyMember) => void;
  }) => {
    return (
      <View style={styles.card}>
        {/* 카드 상단 - 아바타 / 이름 / 전화 버튼 */}
        <View style={styles.cardHeader}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/avatar.png')} // 아바타 이미지 경로 (또는 URL 사용 가능)
              style={styles.avatar}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.relation}>{member.relation}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onCall(member.phoneNumber)}
            style={styles.callButton}>
            <Avatar.Icon
              icon="phone"
              size={48}
              color="#ffffff"
              style={{backgroundColor: '#1fe087'}}
            />
          </TouchableOpacity>
        </View>

        {/* 카드 본문 */}
        <View style={styles.cardBody}>
          <Text style={styles.text}>
            <Text style={styles.textLabel}>Age:</Text> {member.age}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textLabel}>Mobile:</Text> {member.phoneNumber}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textLabel}>Birthday:</Text> {member.birthdate}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textLabel}>Address:</Text> {member.address}
          </Text>
          {member.note ? (
            <Text style={styles.text}>
              <Text style={styles.textLabel}>Note:</Text> {member.note}
            </Text>
          ) : null}
        </View>

        {/* 카드 하단 - 수정 버튼 */}
        <View style={styles.cardFooter}>
          <Pressable
            onPress={async () => await Share.share({message: '공유할 메시지'})}>
            <Avatar.Icon
              icon="share-all-outline"
              size={40}
              color={theme.colors.primary}
              style={{backgroundColor: theme.colors.primaryContainer}}
            />
          </Pressable>
          <TouchableOpacity onPress={() => onEdit(member)}>
            <Avatar.Icon
              icon="account-edit-outline"
              size={40}
              color={theme.colors.primary}
              style={{backgroundColor: theme.colors.primaryContainer}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {fetchError && (
        <Text style={[styles.errorText, {color: theme.colors.error}]}>
          Error : {fetchError}
        </Text>
      )}

      {!isLoading && !fetchError && (
        <ScrollView style={styles.scrollContainer}>
          {familyMember.map(member => (
            <MemberCard
              key={member._id}
              member={member}
              onCall={phoneNumber => Linking.openURL(`tel:${phoneNumber}`)}
              onEdit={member => console.log('Edit:', member)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
