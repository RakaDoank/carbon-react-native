import {
	NavigationContainer,
} from '@react-navigation/native'

import {
	createNativeStackNavigator,
} from '@react-navigation/native-stack'

import {
	ComponentScreen,
	HomeScreen,
} from '@/screens'

import type {
	NavigationType,
} from '@/types'

export function Navigation() {

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					orientation: 'all',
				}}
			>
				<Stack.Screen
					name="home"
					component={ HomeScreen }
				/>
				<Stack.Screen
					name="accordion"
					component={ ComponentScreen.Accordion }
				/>
				<Stack.Screen
					name="component_button"
					component={ ComponentScreen.Button }
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)

}

const Stack = createNativeStackNavigator<NavigationType.Stacks>()
