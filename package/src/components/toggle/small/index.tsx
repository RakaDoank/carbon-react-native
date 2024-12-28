import {
	forwardRef,
} from 'react'

import {
	Base,
	type BaseProps,
	type BaseRef,
} from '../base'

export interface SmallProps extends Omit<BaseProps, 'switchProps'> {
	switchProps?: Omit<BaseProps['switchProps'], 'size'>,
}

export interface SmallRef extends BaseRef {
}

export const Small = forwardRef<SmallRef, SmallProps>(
	function Small(
		{
			switchProps,
			...props
		},
		ref,
	) {

		return (
			<Base
				{ ...props }
				switchProps={{
					...switchProps,
					size: 'small',
				}}
				ref={ ref }
			/>
		)

	},
)
