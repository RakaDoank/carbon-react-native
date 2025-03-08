import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	ToastContext,
} from '../../contexts'

import {
	Overlay,
	type OverlayRef,
} from './_overlay'

import type {
	ToastRef,
} from './_types'

export type {
	ToastRef,
} from './_types'

export interface ToastProps {
	children?: React.ReactNode,
}

export const Toast = forwardRef<ToastRef, ToastProps>(
	function Toast(
		{
			children,
		},
		ref,
	) {

		const
			overlayRef =
				useRef<OverlayRef>(null),

			show: ToastContext['show'] =
				useCallback((...args) => {
					overlayRef.current?.show(...args)
				}, []),

			dismiss: ToastContext['dismiss'] =
				useCallback((...args) => {
					overlayRef.current?.dismiss(...args)
				}, [])

		useImperativeHandle(ref, () => {
			return {
				show,
				dismiss,
			}
		}, [
			show,
			dismiss,
		])

		return (
			<ToastContext.Provider
				value={{
					show,
					dismiss,
				}}
			>
				{ children }

				<Overlay
					ref={ overlayRef }
				/>
			</ToastContext.Provider>
		)

	},
)
