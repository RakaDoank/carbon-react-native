import {
	useContext,
} from 'react'

import type {
	Meta,
	StoryFn,
} from '@storybook/react-native'

import {
	BreakpointContext,
	Button,
	ButtonGroup,
	DialogContext,
	DialogProvider,
	Modal as CarbonModal,
} from '@audira/carbon-react-native'

export default {
	title: 'Utilities/Modal',
	decorators: Story => {
		return (
			<DialogProvider>
				<Story/>
			</DialogProvider>
		)
	},
} satisfies Meta

export const Modal: StoryFn = () => {

	const
		breakpoint =
			useContext(BreakpointContext),

		dialogContext =
			useContext(DialogContext),

		showModal =
			() => {
				dialogContext.show({
					component: (
						<CarbonModal
							title="Testing"
							buttonCloseProps={{
								onPress() {
									dialogContext.dismiss()
								},
							}}
						>
							{ breakpoint == 'small' ? (
								// This is just an example
								// Smaller window (phone) is too narrow to fit three buttons
								<ButtonGroup
									fluid
									button1={
										<Button.Secondary
											text="Secondary"
										/>
									}
									button2={
										<Button.Primary
											text="Primary"
										/>
									}
								/>
							) : (
								<ButtonGroup
									fluid
									oneAlone
									button1={
										<Button.Ghost
											text="Ghost"
										/>
									}
									button2={
										<Button.Secondary
											text="Secondary"
										/>
									}
									button3={
										<Button.Primary
											text="Primary"
										/>
									}
								/>
							) }
						</CarbonModal>
					),
				})
			}

	return (
		<Button.Primary
			text="Launch Modal"
			onPress={ showModal }
		/>
	)

}

export const ModalStack: StoryFn = () => {

	const
		dialogContext =
			useContext(DialogContext),

		showModal2 =
			() => {
				dialogContext.show({
					stack: true,
					component: (
						<CarbonModal
							title="Modal 2"
							buttonCloseProps={{
								onPress() {
									dialogContext.dismiss()
								},
							}}
						/>
					),
				})
			},

		showModal =
			() => {
				dialogContext.show({
					component: (
						<CarbonModal
							title="Testing"
							buttonCloseProps={{
								onPress() {
									dialogContext.dismiss()
								},
							}}
						>
							<ButtonGroup
								fluid
								button1={
									<Button.Secondary
										text="Dismiss"
										onPress={ dialogContext.dismiss as () => void }
									/>
								}
								button2={
									<Button.Primary
										text="Second Modal"
										onPress={ showModal2 }
									/>
								}
							/>
						</CarbonModal>
					),
				})
			}

	return (
		<Button.Primary
			text="Launch Modal"
			onPress={ showModal }
		/>
	)

}
