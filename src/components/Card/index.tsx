import {
  Container, 
  Title,
  Content,
} from './styles';
import Icon from 'react-native-vector-icons/Entypo';

import { useTheme } from 'styled-components/native';
import { ItemData } from '../../screens/Home';
import { TouchableOpacityProps } from 'react-native';

type ItemProps = TouchableOpacityProps & {
  item: ItemData;
};


const Card: React.FC<ItemProps> = ({item, ...rest}: ItemProps) => {
  const { COLORS } = useTheme();
  return (
    <Container {...rest}>
      <Content isDirection={item.isDirection}>
        <Icon name={item.isDirection ? 'users' : 'user'} size={20} color={item.isDirection ? COLORS.GRAY_800 : COLORS.WHITE}/>
        <Title>{item.name}</Title>
      </Content>
      
    </Container>
  );
};


export default Card;
