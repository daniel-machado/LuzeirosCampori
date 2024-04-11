import { StyleSheet } from 'react-native';
import { JSX } from 'react';
import { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={styled.ColorSuccessBorder}
      contentContainerStyle={styled.contentContainerStyleTost}
      text1Style={styled.Text1}
      text2Style={styled.Text2}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styled.ColorErrorBorder}
      contentContainerStyle={styled.contentContainerStyleTost}
      text1Style={styled.Text1}
      text2Style={styled.Text2}
    />
  ),
  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styled.ColorInfoBorder}
      contentContainerStyle={styled.contentContainerStyleTost}
      text1Style={styled.Text1}
      text2Style={styled.Text2}
    />
  ),
  atencion: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styled.ColorAtencionBorder}
      contentContainerStyle={styled.contentContainerStyleTost}
      text1Style={styled.Text1}
      text2Style={styled.Text2}
    />
  ),
};

const styled = StyleSheet.create({
  ColorSuccessBorder: {
    borderLeftColor: '#03B252',
  },
  ColorErrorBorder: {
    borderLeftColor: '#DC1637',
  },
  ColorInfoBorder: {
    borderLeftColor: '#3C39DA',
  },
  ColorAtencionBorder: {
    borderLeftColor: '#FFD600',
  },
  contentContainerStyleTost: {
    paddingHorizontal: 20,
  },
  Text1: {
    fontSize: 14,
    fontWeight: '400',
  },
  Text2: {
    fontSize: 12,
  },
});
