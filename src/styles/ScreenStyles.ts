import {StyleSheet} from 'react-native';
import {MD3Theme} from 'react-native-paper'; // React Native Paper의 테마 타입

export const ScreenStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.primary,
    },
    errorText: {
      fontSize: 16,
      marginVertical: 12,
    },
    card: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 2,
    },
    cardText: {
      fontSize: 18,
    },
  });
