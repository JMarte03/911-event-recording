import './gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NavigationContainer } from '@react-navigation/native';

import AboutMe from './Components/AboutMe';
import CreateEScreen from './Components/CreateEScreen'
import ViewEStackNavigator from './Components/ViewEStackNavigator';

export default function App() {

  const tabConfig = [
    {
      name: 'Events',
      component: ViewEStackNavigator,
      iconName: 'grid',
      iconComponent: Ionicons,
    },
    {
      name: 'Add',
      component: CreateEScreen,
      iconName: 'pluscircle',
      iconComponent: AntDesign,
    },
    {
      name: 'Me',
      component: AboutMe,
      iconName: 'infocirlce',
      iconComponent: AntDesign,
    },
  ]

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, size, color }) => {
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );
      const iconName = routeConfig.iconName;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} color={color} size={size} /> 
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#f3eae4',
    tabBarStyle: {
      height: 70,
      backgroundColor: '#d6556c',
    }
  })

  const TabNav = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <TabNav.Navigator screenOptions={screenOptions}>
        {tabConfig.map(({ name, component }) => (
          <TabNav.Screen key={name} name={name} component={component} options={{
            headerShown: false,
            tabBarShowLabel: false,
            backgroundColor: 'blue',
          }} />
        ))}
      </TabNav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
