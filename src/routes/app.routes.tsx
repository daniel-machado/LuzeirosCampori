import { createNativeStackNavigator, NativeStackNavigationProp  } from '@react-navigation/native-stack';

import Home from '../screens/Home';

type AppRoutes = {
  home: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;
const Stack = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false, 
      animation: 'slide_from_bottom', 
    }}>
      <Stack.Screen
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  );
}