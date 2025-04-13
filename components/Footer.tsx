import React, {useState, useMemo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {HomeScreen, FamilyScreen, MedicalScreen, MyPage} from '../src/screens';

const Footer = () => {
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {
        key: 'home',
        title: 'Home',
        component: HomeScreen,
      },
      {
        key: 'family',
        title: '가족 등록',
        component: FamilyScreen,
      },
      {
        key: 'medical',
        title: '가족력 등록',
        component: MedicalScreen,
      },
      {
        key: 'account',
        title: '내 정보',
        component: MyPage,
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
            style={[styles.tab, index === idx && styles.activeTab]}
            onPress={() => setIndex(idx)}>
            <Text style={[styles.tabText, index === idx && styles.activeText]}>
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
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Footer;
