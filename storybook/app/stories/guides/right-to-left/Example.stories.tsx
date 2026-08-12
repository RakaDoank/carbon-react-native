import type {
	Meta,
	StoryFn,
} from "@storybook/react-native"

import {
	Button as CarbonButton,
	ButtonGroup as CarbonButtonGroup,
	CarbonReactNative,
} from "@audira/carbon-react-native"

interface ExampleArgs {
	rtl: boolean,
}

export default {
	title: "Guides/Right to Left (RTL)",
	args: {
		rtl: true,
	},
	argTypes: {
		rtl: {
			control: "boolean",
			description: "`rtl` prop for the &lt;CarbonReactNative&gt;",
			table: {
				defaultValue: {
					summary: "false",
				},
			},
		},
	},
} satisfies Meta<ExampleArgs>

export const Button: StoryFn<ExampleArgs> = args => {
	return (
		<CarbonReactNative
			rtl={ args.rtl }
		>
			<CarbonButton.Primary
				text={ args.rtl ? "مرحبًا" : "Hello" }
			/>
		</CarbonReactNative>
	)
}

export const ButtonGroup: StoryFn<ExampleArgs> = args => {
	return (
		<CarbonReactNative
			rtl={ args.rtl }
		>
			<CarbonButtonGroup
				fluid
				oneAlone
				button1={
					<CarbonButton.Ghost
						text={ args.rtl ? "شبح" : "Ghost" }
					/>
				}
				button2={
					<CarbonButton.Secondary
						text={ args.rtl ? "مرحبًا" : "Hello" }
					/>
				}
				button3={
					<CarbonButton.Primary
						text={ args.rtl ? "عالم" : "World" }
					/>
				}
			/>
		</CarbonReactNative>
	)
}
