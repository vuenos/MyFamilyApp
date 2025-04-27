import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';
import {useTheme} from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Header() {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: theme.colors.primaryContainer}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="APP" />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
    </>
  );
}
