import React, {useState} from 'react';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

interface FamilyMember {
  name: string;
  age: number;
  photo: string | null;
  relation: string;
  phoneNumber: string;
  birthdate: string;
  address: string;
  note: string;
}

export default function FamilyScreen() {
  const [familyMember, setFamilyMember] = useState<FamilyMember>({
    name: '',
    age: 0,
    photo: null,
    relation: '',
    phoneNumber: '',
    birthdate: '',
    address: '',
    note: '',
  });

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

  const handleSubmit = () => {
    // TODO: 서버에 데이터 전송 로직 구현
    console.log('가족 정보:', familyMember);
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

        <TextInput
          mode="outlined"
          label="관계"
          value={familyMember.relation}
          onChangeText={text =>
            setFamilyMember(prev => ({...prev, relation: text}))
          }
          style={styles.input}
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
          style={styles.submitButton}>
          등록하기
        </Button>
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
  submitButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
  multilineInput: {
    minHeight: 100,
  },
});
