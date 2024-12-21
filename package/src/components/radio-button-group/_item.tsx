import {
	forwardRef,
	useCallback,
	useContext,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	RadioButton,
	type RadioButtonProps,
	type RadioButtonRef,
} from '../radio-button'

import {
	RadioButtonGroupItemContext,
} from './_item-context'

import type {
	RadioButtonGroupItemProps,
	RadioButtonGroupItemRef,
} from './_types'

export const RadioButtonGroupItem = forwardRef<RadioButtonGroupItemRef, RadioButtonGroupItemProps>(
	function RadioButtonGroupItem(
		{
			value: valueProp,
			onPress,
			...props
		},
		forwardedRef,
	) {

		const
			{ controlled, value, setValue } =
				useContext(RadioButtonGroupItemContext),

			radioButtonRef =
				useRef<RadioButtonRef>(null),

			pressHandler: NonNullable<RadioButtonProps['onPress']> =
				useCallback(event => {
					onPress?.(event)
					if(!controlled) {
						setValue?.(valueProp)
					}
				}, [
					controlled,
					valueProp,
					setValue,
					onPress,
				])

		useImperativeHandle(forwardedRef, () => {
			return Object.assign<RadioButtonRef, { setChecked: RadioButtonRef['setChecked'] }>(
				(radioButtonRef.current ?? {}) as RadioButtonRef,
				{
					setChecked(checkedParam) {
						if(!controlled) {
							let checked: boolean

							if(typeof checkedParam === 'boolean') {
								checked = checkedParam
							} else {
								checked = checkedParam(!!radioButtonRef.current?.checked)
							}

							setValue?.(checked ? valueProp : undefined)
						}
					},
				},
			)
		}, [
			controlled,
			valueProp,
			setValue,
		])

		return (
			<RadioButton
				{ ...props }
				value={ value }
				controlled
				checked={ value === valueProp }
				onPress={ pressHandler }
				ref={ radioButtonRef }
			/>
		)

	}
)
