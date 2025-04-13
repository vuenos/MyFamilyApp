import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  SegmentedButtons,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {AxiosError} from 'axios';
import {axiosInstance} from '../libs/axiosClient.ts';

type RelationType =
  | '아버지'
  | '어머니'
  | '남편'
  | '아내'
  | '아들'
  | '딸'
  | '형제/자매'
  | '본인';

interface FamilyMember {
  name: string;
  age: number;
  relation: RelationType;
  gender: string;
  photo?: string | null;
  phoneNumber?: string;
  birthdate?: string;
  address?: string;
  note?: string;
}

interface ErrorResponse {
  message: string;
  err?: string;
}

export default function FamilyScreen() {
  const theme = useTheme();
  const [familyMember, setFamilyMember] = useState<FamilyMember>({
    name: '',
    age: 0,
    relation: '기타',
    gender: '남성',
    photo: null,
    phoneNumber: '',
    birthdate: '',
    address: '',
    note: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const relationOptions: RelationType[] = [
    '아버지',
    '어머니',
    '남편',
    '아내',
    '아들',
    '딸',
    '형제/자매',
    '본인',
  ];

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets?.[0]?.uri) {
      setFamilyMember(prev => ({
        ...prev,
        photo: result.assets?.[0].uri || null,
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!familyMember.name.trim()) {
      return '이름을 입력해주세요.';
    }
    if (!familyMember.relation) {
      return '관계를 선택해주세요.';
    }
    if (familyMember.age <= 0) {
      return '올바른 나이를 입력해주세요.';
    }
    if (
      familyMember.birthdate &&
      !/^\d{4}-\d{2}-\d{2}$/.test(familyMember.birthdate)
    ) {
      return '생년월일을 YYYY-MM-DD 형식으로 입력해주세요.';
    }
    if (
      familyMember.phoneNumber &&
      !/^[0-9-]+$/.test(familyMember.phoneNumber)
    ) {
      return '올바른 전화번호 형식을 입력해주세요.';
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('입력 오류', validationError);
      return;
    }

    setIsLoading(true);
    setFetchError(null);

    try {
      // photo를 제외한 데이터 객체 생성
      const submitData = {...familyMember};
      delete submitData.photo;

      const response = await axiosInstance.post('/family', submitData);

      if (response.status === 201) {
        Alert.alert('성공', '가족 구성원이 등록되었습니다.', [
          {
            text: '확인',
            onPress: () => {
              setFamilyMember({
                name: '',
                age: 0,
                relation: '본인',
                gender: '남성',
                photo: null,
                phoneNumber: '',
                birthdate: '',
                address: '',
                note: '',
              });
              setFetchError(null);
            },
          },
        ]);
      }
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.err ||
        error.message ||
        '알 수 없는 오류가 발생했습니다.';
      setFetchError(errorMessage);
      Alert.alert('오류', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          가족 구성원 등록
        </Text>

        {familyMember.photo ? (
          <Image
            source={{uri: familyMember.photo}}
            style={styles.photoPreview}
          />
        ) : null}

        <Button
          mode="outlined"
          onPress={selectImage}
          style={styles.photoButton}
          icon="camera">
          가족 사진 선택
        </Button>

        <TextInput
          mode="outlined"
          label="이름"
          value={familyMember.name}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, name: text}))
          }
          style={styles.input}
        />

        <Text style={styles.label}>관계</Text>
        <SegmentedButtons
          value={familyMember.relation}
          onValueChange={value =>
            setFamilyMember(prev => ({
              ...prev,
              relation: value as RelationType,
            }))
          }
          buttons={relationOptions.map(relation => ({
            value: relation,
            label: relation,
          }))}
          style={styles.segmentedButtons}
        />

        <SegmentedButtons
          value={familyMember.gender}
          onValueChange={value =>
            setFamilyMember(prev => ({...prev, gender: value}))
          }
          buttons={[
            {value: '남성', label: '남성'},
            {value: '여성', label: '여성'},
          ]}
          style={styles.segmentedButtons}
        />

        <TextInput
          mode="outlined"
          label="나이"
          value={String(familyMember.age)}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, age: Number(text) || 0}))
          }
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="전화번호"
          value={familyMember.phoneNumber}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, phoneNumber: text}))
          }
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="생년월일"
          value={familyMember.birthdate}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, birthdate: text}))
          }
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="주소"
          value={familyMember.address}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, address: text}))
          }
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="메모"
          value={familyMember.note}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, note: text}))
          }
          multiline
          numberOfLines={4}
          style={[styles.input, styles.multilineInput]}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isLoading}>
          {isLoading ? '등록 중...' : '등록하기'}
        </Button>

        {isLoading && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}

        {fetchError && (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            Error: {fetchError}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  photoButton: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  segmentedButtons: {
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  multilineInput: {
    minHeight: 100,
  },
  submitButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
  errorText: {
    fontSize: 16,
    marginVertical: 12,
  },
});
