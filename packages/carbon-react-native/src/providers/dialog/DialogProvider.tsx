import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

import {
	InDialogContext,
} from "../../_internal/contexts"

import {
	DialogAnimationConfigs,
} from "../../const"

import {
	DialogContext,
	type DialogData,
} from "../../contexts/dialog"

import type {
	DialogProviderProps,
} from "./DialogProviderProps"

import type {
	DialogProviderRef,
} from "./DialogProviderRef"

import {
	Controller,
	type ControllerProps,
	type ControllerRef,
} from "./_controller"

export const DialogProvider = forwardRef<DialogProviderRef, DialogProviderProps>(
	function DialogProvider(
		{
			children,
			animationConfig = DialogAnimationConfigs.CarbonReact,
			modalProps,
			overlayProps,
			overlayTouchDismiss,
		},
		ref,
	) {

		const
			controllerWrapperRef =
				useRef<ControllerWrapperRef>(null),

			show: DialogContext["show"] =
				useCallback(data => {
					controllerWrapperRef.current?.show(data)
				}, []),

			dismiss: DialogContext["dismiss"] =
				useCallback(async () => {
					return controllerWrapperRef.current?.dismiss()
				}, []),

			dismissAll: DialogContext["dismissAll"] =
				useCallback(async () => {
					return controllerWrapperRef.current?.dismissAll()
				}, [])

		useImperativeHandle(ref, () => {
			return {
				show,
				dismiss,
				dismissAll,
			}
		}, [
			show,
			dismiss,
			dismissAll,
		])

		return (
			<DialogContext.Provider
				value={{
					show,
					dismiss,
					dismissAll,
				}}
			>
				{ children }

				<ControllerWrapper
					ref={ controllerWrapperRef }
					animationConfig={ animationConfig as typeof DialogAnimationConfigs.CarbonReact }
					modalProps={ modalProps }
					overlayProps={ overlayProps }
					overlayTouchDismiss={ overlayTouchDismiss }
				/>
			</DialogContext.Provider>
		)

	},
)

interface ControllerWrapperProps extends Omit<ControllerProps, "onEmpty"> {
	ref?: React.Ref<ControllerWrapperRef>,
}

interface ControllerWrapperRef extends ControllerRef {
}

/**
 * This is a simple component to save a bit of memory by not mounting the actual `Controller` when it's not needed
 */
function ControllerWrapper({
	ref,
	...props
}: ControllerWrapperProps) {

	const
		[mount, setMount] =
			useState(false),

		controllerRef =
			useRef<ControllerRef>(null),

		dialogDataQueue =
			useRef<DialogData>(null),

		onEmpty =
			useCallback(() => {
				if(!dialogDataQueue.current && controllerRef.current) {
					setMount(false)
				}
			}, [])

	useImperativeHandle(ref, () => {
		const errMsg = "Error to get the Controller's ref"

		return {
			show(data) {
				if(controllerRef.current) {
					controllerRef.current.show(data)
				} else {
					dialogDataQueue.current = data
					setMount(true)
				}
			},
			dismiss() {
				if(controllerRef.current) {
					return controllerRef.current.dismiss()
				}
				console.error(errMsg)
				return Promise.resolve()
			},
			dismissAll() {
				if(controllerRef.current) {
					return controllerRef.current.dismissAll()
				}
				console.error(errMsg)
				return Promise.resolve()
			},
		}
	}, [])

	useEffect(() => {
		if(mount && dialogDataQueue.current && controllerRef.current) {
			controllerRef.current.show({ ...dialogDataQueue.current })
			dialogDataQueue.current = null
		}
	}, [
		mount,
	])

	if(!mount) {
		return null
	}

	return (
		<InDialogContext.Provider value>
			<Controller
				ref={ controllerRef }
				{ ...props }
				onEmpty={ onEmpty }
			/>
		</InDialogContext.Provider>
	)

}
