import {
	useContext,
} from "react"

import {
	StyleSheet,
	type TextStyle,
} from "react-native"

import type {
	Meta,
	StoryFn,
} from "@storybook/react-native-web-vite"

import {
	CarbonStyleSheet,
	Layer,
	LayerContext,
	Text,
	type LayerProps,
} from "@audira/carbon-react-native"

import type {
	ColorLayerLevel,
} from "@audira/carbon-react-native-elements"

export default {
	title: "Components/Layer",
	args: {
		withBackground: false,
	},
	argTypes: {
		withBackground: {
			control: "boolean",
		},
	},
} satisfies Meta<LayerProps>

export const Default: StoryFn<LayerProps> = args => {
	return (
		<>
			<TestComponent internalBackground/>
			<Layer { ...args }>
				<TestComponent internalBackground={ !args.withBackground }/>
				<Layer { ...args }>
					<TestComponent internalBackground={ !args.withBackground }/>
				</Layer>
			</Layer>
		</>
	)
}

interface TestComponentProps {
	internalBackground?: boolean,
}
function TestComponent({
	internalBackground,
}: TestComponentProps) {

	const layerContextLevel = useContext(LayerContext)

	return (
		<Text
			type="body_01"
			style={ [
				styleSheet.testComponent,
				internalBackground
					? testComponentBgLevelStyleSheet[layerContextLevel]
					: undefined,
			] }
		>
			Test Component (Level: { layerContextLevel })
		</Text>
	)
}

const
	styleSheet =
		StyleSheet.create({
			testComponent: {
				padding: 16,
			},
		}),

	testComponentBgLevelStyleSheet =
		CarbonStyleSheet.create<Record<ColorLayerLevel, TextStyle>>({
			1: {
				backgroundColor: CarbonStyleSheet.color.layer_01,
			},
			2: {
				backgroundColor: CarbonStyleSheet.color.layer_02,
			},
			3: {
				backgroundColor: CarbonStyleSheet.color.layer_03,
			},
		})
