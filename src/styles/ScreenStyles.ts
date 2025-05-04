import {StyleSheet, Dimensions} from 'react-native';
import {MD3Theme} from 'react-native-paper'; // React Native Paper의 테마 타입

const screenWidth = Dimensions.get('window').width;

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

    scrollContainer: {
      width: '100%',
    },

    card: {
      width: screenWidth - 32,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary,
      borderRadius: 12,
      padding: 16,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarWrapper: {
      marginRight: 12,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    headerText: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    relation: {
      fontSize: 14,
      color: '#888',
    },
    callButton: {
      padding: 6,
    },
    cardBody: {
      marginTop: 8,
    },
    text: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    textLabel: {
      color: theme.colors.primary,
      fontWeight: 'normal',
    },
    cardFooter: {
      display: 'flex',
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    editButton: {
      backgroundColor: '#007aff',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    editButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },

    resultContainer: {
      flexDirection: 'column',
      width: '100%',
      padding: 24,
    },
    button: {
      backgroundColor: '#FEE500',
      borderRadius: 40,
      borderWidth: 1,
      width: 250,
      height: 40,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 10,
    },
  });
