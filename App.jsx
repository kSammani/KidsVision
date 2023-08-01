import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import First from './src/screens/First';
import Level1CB from './src/screens/Level1CB';
import Test from './src/screens/Test';
import Info from './src/screens/Info';
import Level1N from './src/screens/Level1N';
import Level2N from './src/screens/Level2N';
import Instructions from './src/screens/Instructions';
import FinalScore from './src/screens/FinalScore';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
        <Stack.Screen name="First" component={First} options={{ headerShown: false }} />
        <Stack.Screen name="Level1CB" component={Level1CB} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
        <Stack.Screen name="Level1N" component={Level1N} options={{ headerShown: false }} />
        <Stack.Screen name="Level2N" component={Level2N} options={{ headerShown: false }} />
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="FinalScore" component={FinalScore} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}