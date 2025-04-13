import React, {useState, useMemo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen, FamilyScreen, MedicalScreen, MyPage} from '../src/screens';

const Footer = () => {
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {
        key: 'home',
        title: 'Home',
        component: HomeScreen,
        focusedIcon: 'home',
        unfocusedIcon: 'home-outline',
      },
      {
        key: 'family',
        title: '가족 등록',
        component: FamilyScreen,
        focusedIcon: 'account-multiple-plus',
        unfocusedIcon: 'account-multiple-plus-outline',
      },
      {
        key: 'medical',
        title: '가족력 등록',
        component: MedicalScreen,
        focusedIcon: 'medical-bag',
        unfocusedIcon: 'medical-bag',
      },
      {
        key: 'account',
        title: '내 정보',
        component: MyPage,
        focusedIcon: 'account-circle',
        unfocusedIcon: 'account-circle-outline',
      },
    ],
    [],
  );

  const CurrentScreen = routes[index].component;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CurrentScreen />
      </View>
      <View style={styles.footer}>
        {routes.map((route, idx) => (
          <TouchableOpacity
            key={route.key}
            style={[styles.tab]}
            onPress={() => setIndex(idx)}>
            <Icon
              name={index === idx ? route.focusedIcon : route.unfocusedIcon}
              size={24}
              color={index === idx ? '#6200ee' : '#757575'}
            />
            <Text
              style={[
                styles.tabText,
                index === idx ? styles.activeText : styles.inactiveText,
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 88,
    paddingBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeText: {
    color: '#6200ee',
  },
  inactiveText: {
    color: '#757575',
  },
});

export default Footer;
