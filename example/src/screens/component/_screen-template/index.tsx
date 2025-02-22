import {
	useMemo,
} from 'react'

import {
	ScrollView,
	useWindowDimensions,
	View,
	type ViewProps,
} from 'react-native'

import {
	FlexStyle,
	SpacingConstant,
	StyleSheet,
} from '@audira/carbon-react-native'

import {
	PlaygroundController,
} from './playground-controller'

export type {
	BooleanProps as PlaygroundBooleanProps,
} from './playground-controller/boolean'

export type {
	EnumProps as PlaygroundEnumProps,
} from './playground-controller/enum'

export type {
	TextProps as PlaygroundTextProps,
} from './playground-controller/text'

export interface ScreenTemplateProps extends ViewProps {
	title: string,
	playgroundNode?: React.ReactNode,
}

function Component({
	title,
	children,
	playgroundNode,
	style: styleProp,
	...props
}: ScreenTemplateProps) {

	const
		windowDimensions =
			useWindowDimensions(),

		isLargeDisplay =
			useMemo(() => {
				return windowDimensions.width >= 640 && windowDimensions.height >= 320
			}, [
				windowDimensions.width,
				windowDimensions.height,
			])

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_1,
				isLargeDisplay ? FlexStyle.flex_row : undefined,
				styleProp,
			] }
		>
			<ScrollView
				style={ [
					style.scrollViewContent,
				] }
				contentContainerStyle={ style.scrollViewContentContainer }
			>
				{ children }
			</ScrollView>

			<PlaygroundController title={ title }
				style={ [
					FlexStyle.flex_initial,
					!isLargeDisplay ? style.playgroundController_inCol : style.playgroundController_inRow,
				] }
			>
				{ playgroundNode }
			</PlaygroundController>
		</View>
	)

}

export const ScreenTemplate = Object.assign(Component, {
	PlaygroundBoolean: PlaygroundController.Boolean,
	PlaygroundEnum: PlaygroundController.Enum,
	PlaygroundText: PlaygroundController.Text,
})

const style = StyleSheet.create(color => ({
	scrollViewContent: {
		paddingHorizontal: SpacingConstant.spacing_05,
		backgroundColor: color.background,
	},
	scrollViewContentContainer: {
		paddingVertical: SpacingConstant.spacing_05,
	},
	playgroundController_inCol: {
		height: 360,
	},
	playgroundController_inRow: {
		width: 480,
	},
}))
