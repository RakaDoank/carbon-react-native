import {
	NavigationContainer,
} from '@react-navigation/native'

import {
	createNativeStackNavigator,
} from '@react-navigation/native-stack'

import {
	ComponentsScreen,
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
					name="component_accordion"
					component={ ComponentsScreen.Accordion }
				/>
				<Stack.Screen
					name="component_checkbox"
					component={ ComponentsScreen.Checkbox }
				/>
				<Stack.Screen
					name="component_button"
					component={ ComponentsScreen.Button }
				/>
				<Stack.Screen
					name="component_radio_button"
					component={ ComponentsScreen.RadioButton }
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)

}

const Stack = createNativeStackNavigator<NavigationType.Stacks>()
