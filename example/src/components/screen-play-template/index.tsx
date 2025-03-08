import {
	useContext,
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
	ThemeContext,
} from '@audira/carbon-react-native'

import {
	PlaygroundController,
} from './playground-controller'

export type {
	BooleanProps as ScreenPlayTemplateBooleanProps,
} from './playground-controller/boolean'

export type {
	EnumProps as ScreenPlayTemplateEnumProps,
} from './playground-controller/enum'

export type {
	TextProps as ScreenPlayTemplateTextProps,
} from './playground-controller/text'

export interface ScreenPlayTemplateProps extends ViewProps {
	title: string,
	playgroundNode?: React.ReactNode,
}

function Component({
	title,
	children,
	playgroundNode,
	style: styleProp,
	...props
}: ScreenPlayTemplateProps) {

	useContext(ThemeContext)

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
					FlexStyle.flex_1,
					style.scrollViewContent,
				] }
				contentContainerStyle={ style.scrollViewContentContainer }
			>
				{ children }
			</ScrollView>

			<PlaygroundController title={ title }
				style={ [
					FlexStyle.flex_initial,
					style.playgroundController,
				] }
			>
				{ playgroundNode }
			</PlaygroundController>
		</View>
	)

}

export const ScreenPlayTemplate = Object.assign(Component, {
	PlayBoolean: PlaygroundController.Boolean,
	PlayEnum: PlaygroundController.Enum,
	PlayText: PlaygroundController.Text,
})

const style = StyleSheet.create(color => ({
	scrollViewContent: {
		paddingHorizontal: SpacingConstant.spacing_05,
		backgroundColor: color.background,
	},
	scrollViewContentContainer: {
		paddingVertical: SpacingConstant.spacing_05,
	},
	playgroundController: {
		flexBasis: 400,
	},
}))
