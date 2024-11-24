import {
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	Easing,
} from 'react-native-reanimated'

import {
	MotionConstant,
	SpacingConstant,
} from '../../constants'

import {
	Collapsible,
	type CollapsibleProps,
} from '../collapsible'

import {
	FlexStyle,
} from '../../styles'

import {
	AccordionContext,
} from './context'
import {
	AccordionHeader,
	type AccordionHeaderProps,
} from './header'
import {
	AccordionItemContext,
} from './item-context'

export interface AccordionItemProps extends Omit<AccordionHeaderProps, 'size' | 'text' | 'flushAlignment'> {
	title?: string,
	children?: React.ReactNode,
}

export function AccordionItem({
	title,
	children,
	style: styleProp,
	onPress,
	...props
}: AccordionItemProps) {

	const
		accordionContext =
			useContext(AccordionContext),

		accordionItemContext =
			useContext(AccordionItemContext),

		pressHandler: AccordionHeaderProps['onPress'] =
			event => {
				accordionItemContext.onPress?.(event)
				onPress?.(event)
			}

	return (
		<View
			{ ...props }
			style={ [
				FlexStyle.flex_initial,
				styleProp,
			] }
		>
			<AccordionHeader
				size={ accordionContext.size }
				text={ title }
				flushAlignment={ accordionContext.flushAlignment }
				onPress={ pressHandler }
			/>

			<Collapsible
				motion={ collapsibleMotion }
				controlled
				open={ accordionItemContext.open }
				contentContainerStyle={ [
					accordionItemContext.collapsibleContentContainerStyle,
					style.panel,
				] }
			>
				{ children }
			</Collapsible>
		</View>
	)

}

const
	collapsibleMotion: CollapsibleProps['motion'] =
		{
			toOpen: {
				duration: MotionConstant.Durations.fast_02,
				easing: Easing.bezier(
					MotionConstant.Easings.Entrance.Productive.x1,
					MotionConstant.Easings.Entrance.Productive.y1,
					MotionConstant.Easings.Entrance.Productive.x2,
					MotionConstant.Easings.Entrance.Productive.y2,
				),
			},
			toClose: {
				duration: 0,
			},
		},

	style =
		StyleSheet.create({
			panel: {
				paddingTop: SpacingConstant.spacing_03,
				paddingBottom: SpacingConstant.spacing_06,
				paddingLeft: SpacingConstant.spacing_05,
			},
		})
