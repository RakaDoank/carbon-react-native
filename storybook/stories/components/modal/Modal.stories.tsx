import {
	useContext,
} from 'react'

import type {
	Meta,
	StoryFn,
} from '@storybook/react-native-web-vite'

import {
	BreakpointContext,
	Button,
	ButtonGroup,
	Modal as CarbonModal,
	ModalContent,
	Text,
	type ModalProps,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Modal',
	component: CarbonModal,
	args: {
		title: 'Lorem ipsum dolor sit amet',
		label: '',
		size: 'medium',
	},
	argTypes: {
		title: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
} satisfies Meta<ModalProps>

export const Modal: StoryFn<ModalProps> = args => {

	const
		breakpoint =
			useContext(BreakpointContext)

	return (
		<CarbonModal
			{ ...args }
		>
			<ModalContent>
				<Text type="body_01">
					These texts here (with the &lt;Text&gt; component) are wrapped by &lt;ModalContent&gt; component.{'\n\n'}

					These buttons below are actually a &lt;ButtonGroup&gt; component. You can manually provide the &lt;ButtonGroup&gt; by yourself in the &lt;Modal&gt; as the last element.
				</Text>
			</ModalContent>

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
	)
}
