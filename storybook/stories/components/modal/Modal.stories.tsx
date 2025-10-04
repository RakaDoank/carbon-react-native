import type {
	Meta,
	StoryFn,
} from '@storybook/react-native-web-vite'

import {
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
	return (
		<CarbonModal
			{ ...args }
		>
			<ModalContent

			>
				<Text type="body_01">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et mauris quis massa varius blandit nec sit amet libero. Ut vel sodales felis, ac tincidunt neque. Curabitur euismod, odio pretium imperdiet fermentum, lectus nunc dignissim nisl, quis varius velit nulla facilisis eros. Curabitur tincidunt lacus ut leo vehicula, nec lacinia mauris suscipit.
				</Text>
			</ModalContent>
		</CarbonModal>
	)
}
