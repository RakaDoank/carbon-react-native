import {
	StyleSheet,
} from 'react-native'

import {
	CText,
	type CTextProps,
} from '@/components'

export interface HeadingSectionProps extends CTextProps {
}

export function HeadingSection({
	type = 'heading_03',
	style: styleProp,
	...props
}: HeadingSectionProps) {

	return (
		<CText
			{ ...props }
			type={ type }
			style={ [
				style.margin,
				styleProp,
			] }
		/>
	)

}

const style = StyleSheet.create({
	margin: {
		marginBottom: 16,
	},
})
