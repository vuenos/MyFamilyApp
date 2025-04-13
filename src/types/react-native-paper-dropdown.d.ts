declare module 'react-native-paper-dropdown' {
  import {FC} from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  interface DropDownProps {
    label: string;
    mode?: 'outlined' | 'flat';
    visible: boolean;
    showDropDown: () => void;
    onDismiss: () => void;
    value: string;
    setValue: (value: string) => void;
    list: Array<{
      label: string;
      value: string;
    }>;
    style?: StyleProp<ViewStyle>;
  }

  const DropDown: FC<DropDownProps>;
  export default DropDown;
}
