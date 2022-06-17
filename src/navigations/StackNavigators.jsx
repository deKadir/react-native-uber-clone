import { DestinationScreen, HomeScreen, RequestScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Home = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Home.Navigator>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="DestinationScreen"
        component={DestinationScreen}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
}
