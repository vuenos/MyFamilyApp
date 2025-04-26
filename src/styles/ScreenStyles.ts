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
      marginBottom: 24,
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
      width: 40,
      height: 40,
      borderRadius: 20,
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
      fontSize: 14,
      color: '#333',
      marginBottom: 4,
    },
    cardFooter: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
  });
