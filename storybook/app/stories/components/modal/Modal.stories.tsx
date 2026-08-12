import {
	useContext,
} from "react"

import {
	ScrollView,
	StyleSheet,
	View,
} from "react-native"

import type {
	Meta,
	StoryFn,
} from "@storybook/react-native-web-vite"

import {
	BreakpointContext,
	Button,
	ButtonGroup,
	Modal as CarbonModal,
	ModalContent,
	Text,
	TextInput,
	type ModalProps,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

export default {
	title: "Components/Modal",
	component: CarbonModal,
	args: {
		title: "Lorem ipsum dolor sit amet",
		label: "",
		size: "medium",
	},
	argTypes: {
		title: {
			control: "text",
		},
		label: {
			control: "text",
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
			<ScrollView>
				<ModalContent>
					<Text type="body_01">
						These texts here (with the &lt;Text&gt; component) are wrapped by &lt;ModalContent&gt; component.{"\n\n"}

						Those buttons below are actually a &lt;ButtonGroup&gt; component. You can manually provide the &lt;ButtonGroup&gt; by yourself in the &lt;Modal&gt; as the last element.
					</Text>

					<View
						style={ styleSheet.modalContentInputsContainer }
					>
						<TextInput
							label="Input 1"
							placeholder="Lorem ipsum dolor sit amet"
						/>

						<TextInput
							label="Input 2"
						/>

						<TextInput
							label="Lorem Ipsum"
							placeholder="1.1.1.1"
						/>
					</View>
				</ModalContent>
			</ScrollView>

			{ breakpoint == "small" ? (
				// This is just an example
				// Smaller window (phone) is too narrow to fit three buttons
				<ButtonGroup
					fluid
					size="extra_large"
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
					size="extra_large"
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

const
	styleSheet =
		StyleSheet.create({
			modalContent: {
				flexGrow: 1,
				flexBasis: "auto",
			},
			modalContentInputsContainer: {
				marginTop: Spacing.spacing_08,
				rowGap: Spacing.spacing_06,
			},
		})
