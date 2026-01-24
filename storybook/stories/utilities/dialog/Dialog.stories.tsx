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
} from "@storybook/react-native"

import {
	BreakpointContext,
	Button,
	ButtonGroup,
	DialogContext,
	DialogProvider,
	Modal as CarbonModal,
	ModalContent,
	Text,
	TextInput,
} from "@audira/carbon-react-native"

import {
	Spacing,
} from "@audira/carbon-react-native-elements"

export default {
	title: "Utilities/Dialog",
	decorators: Story => {
		return (
			<DialogProvider>
				<Story/>
			</DialogProvider>
		)
	},
} satisfies Meta

export const Dialog: StoryFn = () => {

	const
		breakpoint =
			useContext(BreakpointContext),

		dialogContext =
			useContext(DialogContext),

		showDialog =
			() => {
				dialogContext.show({
					component: (
						<CarbonModal
							title="Modal Test"
							buttonCloseProps={{
								onPress() {
									dialogContext.dismiss()
								},
							}}
							applyInsetsEdges={{
								bottom: false,
							}}
						>
							<ModalContentSample/>
							{ breakpoint == "small" ? (
								// This is just an example
								// Smaller window (phone) is too narrow to fit three buttons
								<ButtonGroup
									fluid
									size="2xl"
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
					),
				})
			}

	return (
		<Button.Primary
			text="Launch Dialog"
			onPress={ showDialog }
		/>
	)

}

export const DialogStack: StoryFn = () => {

	const
		dialogContext =
			useContext(DialogContext),

		showDialog2 =
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

		showDialog =
			() => {
				dialogContext.show({
					component: (
						<CarbonModal
							title="Modal Test"
							buttonCloseProps={{
								onPress() {
									dialogContext.dismiss()
								},
							}}
							applyInsetsEdges={{
								bottom: false,
							}}
						>
							<ModalContentSample/>
							<ButtonGroup
								fluid
								size="2xl"
								button1={
									<Button.Secondary
										text="Dismiss"
										onPress={ dialogContext.dismiss as () => void }
									/>
								}
								button2={
									<Button.Primary
										text="Second Dialog"
										onPress={ showDialog2 }
									/>
								}
							/>
						</CarbonModal>
					),
				})
			}

	return (
		<Button.Primary
			text="Launch Dialog"
			onPress={ showDialog }
		/>
	)

}

function ModalContentSample() {

	return (
		<ScrollView>
			<ModalContent
				style={ styleSheet.modalContent }
			>
				<Text type="body_01">
					These texts here (with the Text component) are wrapped by &lt;ModalContent&gt; component.{"\n\n"}

					Those buttons below are actually a {"`ButtonGroup`"} component. You can manually provide the {"`ButtonGroup`"} by yourself in the {"`Modal`"} as the last element.{"\n\n"}

					For the scroller, just wrap the {"`ModalContent`"} with a {"`ScrollView`"}
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
