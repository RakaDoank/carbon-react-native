import {
	forwardRef,
	useCallback,
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
			controllerRef =
				useRef<ControllerRef>(null),

			dialogDataQueue =
				useRef<DialogData>(null),

			[mountController, setMountController] =
				useState(false),

			setControllerRef: React.RefCallback<ControllerRef> =
				useCallback(ref => {
					controllerRef.current = ref

					if(controllerRef.current && dialogDataQueue.current) {
						controllerRef.current.show({ ...dialogDataQueue.current })
						dialogDataQueue.current = null
					}
				}, []),

			show: DialogContext["show"] =
				useCallback(data => {
					if(!controllerRef.current) {
						dialogDataQueue.current = { ...data }
						setMountController(true)
					} else {
						controllerRef.current?.show(data)
					}
				}, []),

			dismiss: DialogContext["dismiss"] =
				useCallback(async () => {
					return controllerRef.current?.dismiss()
				}, []),

			dismissAll: DialogContext["dismissAll"] =
				useCallback(async () => {
					return controllerRef.current?.dismissAll()
				}, []),

			onEmpty =
				useCallback(() => {
					if(!dialogDataQueue.current) {
						setMountController(false)
					}
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

				{ mountController && (
					<InDialogContext.Provider value={ true }>
						<Controller
							ref={ setControllerRef }
							animationConfig={ animationConfig as typeof DialogAnimationConfigs.CarbonReact }
							modalProps={ modalProps }
							overlayProps={ overlayProps }
							overlayTouchDismiss={ overlayTouchDismiss }
							onEmpty={ onEmpty }
						/>
					</InDialogContext.Provider>
				) }
			</DialogContext.Provider>
		)

	},
)
