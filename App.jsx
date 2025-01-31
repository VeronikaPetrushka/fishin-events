import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen from './src/screens/OnBoardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddCatchScreen from './src/screens/AddCatchScreen';
import CatchDetailsScreen from './src/screens/CatchDetailsScreen';
import CatchesScreen from './src/screens/CatchesScreen';
import EncyclopediaScreen from './src/screens/EncyclopediaScreen';
import EncyclopediaDetailsScreen from './src/screens/EncyclopediaDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { MusicProvider } from './src/constants/music.js';
import MusicPlayer from './src/components/MusicPlayer';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <MusicProvider>
            <MusicPlayer />
            <NavigationContainer>
                  <Stack.Navigator initialRouteName={"OnBoardingScreen" }>
                        <Stack.Screen 
                              name="OnBoardingScreen" 
                              component={OnBoardingScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="HomeScreen" 
                              component={HomeScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="AddCatchScreen" 
                              component={AddCatchScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CatchDetailsScreen" 
                              component={CatchDetailsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CatchesScreen" 
                              component={CatchesScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="EncyclopediaScreen" 
                              component={EncyclopediaScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="EncyclopediaDetailsScreen" 
                              component={EncyclopediaDetailsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="SettingsScreen" 
                              component={SettingsScreen} 
                              options={{ headerShown: false }} 
                        />
                  </Stack.Navigator>
            </NavigationContainer>
      </MusicProvider>
    );
};

export default App;
