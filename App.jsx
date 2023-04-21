import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import First from './src/screens/First';
import Level1CB from './src/screens/Level1CB';
import Test from './src/screens/Test';
import Info from './src/screens/Info';
import Level1N from './src/screens/Level1N';
import Instructions from './src/screens/Instructions';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="First" component={First} />
      <Stack.Screen name="Level1CB" component={Level1CB}/>
      <Stack.Screen name="Test" component={Test}/>
      <Stack.Screen name="Level1N" component={Level1N}/>
      <Stack.Screen name="Instructions" component={Instructions}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}