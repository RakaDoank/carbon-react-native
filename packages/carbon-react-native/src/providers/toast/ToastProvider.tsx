import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react'

import {
	ToastContext,
} from '../../contexts'


import type {
	ToastProviderProps,
} from './ToastProviderProps'

import type {
	ToastRef,
} from './ToastRef'
import {
	Overlay,
	type OverlayRef,
} from './_overlay'

export const ToastProvider = forwardRef<ToastRef, ToastProviderProps>(
	function ToastProvider(
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
