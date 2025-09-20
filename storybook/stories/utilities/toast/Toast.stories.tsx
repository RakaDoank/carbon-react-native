import {
	useContext,
} from 'react'

import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	Button,
	Notification,
	ToastContext,
	ToastProvider,
} from '@audira/carbon-react-native'

export default {
	title: 'Utilities/Toast',
	decorators: Story => {
		return (
			<ToastProvider>
				<Story/>
			</ToastProvider>
		)
	},
} satisfies Meta

export const NotificationToastError: StoryFn = () => {

	const
		toastContext =
			useContext(ToastContext),

		showToast =
			() => {
				toastContext.show((id) => (
					<Notification.Toast.Error
						subtitle="Lorem ipsum dolor sit amet"
						onPressIconClose={ () => {
							toastContext.dismiss(id)
						} }
					/>
				))
			}

	return (
		<Button.PrimaryDanger
			text="Press me"
			onPress={ showToast }
		/>
	)

}

export const NotificationToastInformational: StoryFn = () => {

	const
		toastContext =
			useContext(ToastContext),

		showToast =
			() => {
				toastContext.show((id) => (
					<Notification.Toast.Informational
						subtitle="Lorem ipsum dolor sit amet"
						onPressIconClose={ () => {
							toastContext.dismiss(id)
						} }
					/>
				), {
					duration: 10000,
				})
			}

	return (
		<Button.Primary
			text="Press me"
			onPress={ showToast }
		/>
	)

}

export const NotificationToastSuccess: StoryFn = () => {

	const
		toastContext =
			useContext(ToastContext),

		showToast =
			() => {
				toastContext.show((id) => (
					<Notification.Toast.Success
						subtitle="Lorem ipsum dolor sit amet"
						onPressIconClose={ () => {
							toastContext.dismiss(id)
						} }
					/>
				), {
					duration: 10000,
				})
			}

	return (
		<Button.Primary
			text="Press me"
			onPress={ showToast }
		/>
	)

}
