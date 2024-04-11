import styled from 'styled-components/native';
//import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
  isDirection: boolean;
}

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 7px;
`;

export const Content = styled.View<Props>`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 12px;
  width: 90%;
  background-color: ${({isDirection, theme}) => isDirection 
    ? theme.COLORS.YELLOW_MID 
    : theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-family:  ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_800};
`;
