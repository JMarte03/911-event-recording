import { createStackNavigator } from '@react-navigation/stack'
import ViewEScreen from './ViewEScreen'
import Details from './Details'

const ViewEStack = createStackNavigator()

export default function ViewEStackNavigator() {
    return (
        <ViewEStack.Navigator>
            <ViewEStack.Screen name="Events" component={ViewEScreen} options={{
                headerShown: false
            }}/>
            <ViewEStack.Screen name="Event details" component={Details} options={{
                headerStyle: {
                    backgroundColor: '#f3eae4'
                },
                headerTintColor: '#746561'
            }} />
        </ViewEStack.Navigator>
    )
}

