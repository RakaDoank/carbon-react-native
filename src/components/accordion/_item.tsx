import {
	useContext,
} from 'react'

import {
	StyleSheet,
	View,
} from 'react-native'

import {
	SpacingConstant,
} from '../../constants'

import {
	Collapsible,
} from '../collapsible'

import {
	AccordionContext,
} from './_context'

import {
	AccordionHeader,
	type AccordionHeaderProps,
} from './_header'

import {
	AccordionItemContext,
} from './_item-context'

import {
	AccordionMotion,
} from './_motion'

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
			style={ styleProp }
		>
			<AccordionHeader
				size={ accordionContext.size }
				text={ title }
				flushAlignment={ accordionContext.flushAlignment }
				onPress={ pressHandler }
			/>

			<Collapsible
				motion={ AccordionMotion }
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
	style =
		StyleSheet.create({
			panel: {
				paddingTop: SpacingConstant.spacing_03,
				paddingBottom: SpacingConstant.spacing_06,
				paddingLeft: SpacingConstant.spacing_05,
			},
		})
