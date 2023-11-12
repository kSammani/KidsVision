import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './src/screens/Splash';
import First from './src/screens/First';

import Level1CB from './src/screens/Level1CB';
import Level2CB from './src/screens/Level2CB';

import InstructionL3CB from './src/screens/InstructionL3CB';
import Level3CBLevel1 from './src/screens/Level3CB/Level1';
import Level3CBLevel2 from './src/screens/Level3CB/Level2';
import Level3CBLevel3 from './src/screens/Level3CB/Level3';
import Level3CBLevel4 from './src/screens/Level3CB/Level4';
import Level3CBLevel5 from './src/screens/Level3CB/Level5';

import Info from './src/screens/Info';
import Level1N from './src/screens/Level1N';
import Level2N from './src/screens/Level2N';
import Instructions from './src/screens/Instructions';
import FinalScore from './src/screens/FinalScore';
import InstructionL1CB from './src/screens/InstructionL1CB';
import InstructionL2CB from './src/screens/InstructionL2CB';
import InstructionL1N from './src/screens/InstructionL1N';
import InstructionL2N from './src/screens/InstructionL2N';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
        <Stack.Screen name="First" component={First} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionL1CB" component={InstructionL1CB} options={{ headerShown: false }} />
        <Stack.Screen name="Level1CB" component={Level1CB} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionL2CB" component={InstructionL2CB} options={{ headerShown: false }} />
        <Stack.Screen name="Level2CB" component={Level2CB} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionL3CB" component={InstructionL3CB} options={{ headerShown: false }} />
        <Stack.Screen name="Level3CBLevel1" component={Level3CBLevel1} options={{ headerShown: false }} />
        <Stack.Screen name="Level3CBLevel2" component={Level3CBLevel2} options={{ headerShown: false }} />
        <Stack.Screen name="Level3CBLevel3" component={Level3CBLevel3} options={{ headerShown: false }} />
        <Stack.Screen name="Level3CBLevel4" component={Level3CBLevel4} options={{ headerShown: false }} />
        <Stack.Screen name="Level3CBLevel5" component={Level3CBLevel5} options={{ headerShown: false }} />
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionL1N" component={InstructionL1N} options={{ headerShown: false }} />
        <Stack.Screen name="Level1N" component={Level1N} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionL2N" component={InstructionL2N} options={{ headerShown: false }} />
        <Stack.Screen name="Level2N" component={Level2N} options={{ headerShown: false }} />
        <Stack.Screen name="FinalScore" component={FinalScore} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}