import {
	useContext,
} from 'react'

import {
	Button,
	Notification,
	ToastContext,
} from '@audira/carbon-react-native'

import {
	ScreenPlayTemplate,
} from '@/components'

export function Toast() {

	const
		toastContext =
			useContext(ToastContext),

		toastMe =
			() => {
				toastContext.show(
					() => (
						<Notification.Toast.Informational
							subtitle="Hola"
						/>
					),
				)
			}

	return (
		<ScreenPlayTemplate
			title="Toast"
		>
			<Button.Primary
				text="Toast Me"
				onPress={ toastMe }
			/>
		</ScreenPlayTemplate>
	)

}
