import {
	forwardRef,
} from 'react'

import {
	StyleSheet,
	Text,
	type TextProps,
} from '@audira/carbon-react-native'

export interface CTextProps extends TextProps {
}

export const CText = forwardRef<Text, CTextProps>(
	function CText(
		{
			style: styleProp,
			...props
		},
		ref,
	) {

		return (
			<Text
				{ ...props }
				ref={ ref as never }
				style={ [
					style.text,
					styleProp,
				] }
			/>
		)

	},

)

const style = StyleSheet.create(color => ({
	text: {
		color: color.text_primary,
	},
}))
