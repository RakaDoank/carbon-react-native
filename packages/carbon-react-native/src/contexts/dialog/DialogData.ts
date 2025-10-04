// import type {
// 	DialogType,
// } from './DialogType'

export interface DialogData {
	component: React.ReactNode,
	/**
	 * You can open another next dialog while keeping the previous dialog mounted. When you close the next dialog, the previous dialog will be appeared again
	 */
	stack?: boolean,
	/**
	 * A `modal` dialog triggers a state (or mode) that focuses the user’s attention exclusively on one task or piece of relevant information. When a modal dialog is active, the content of the underneath page is obscured and inaccessible until the user completes the task or dismisses the modal.
	 * 
	 * When a `non_modal` dialog is active the user can continue viewing and interacting with the main page while the dialog is open. Non-modal dialogs are commonly used to present non-critical information or optional user tasks.
	 * 
	 * Remember! If you use `stack` dialog, the first and subsequent dialogs will use the first `type` value. You can't change the type for the next dialog.
	 * 
	 * @default 'modal'
	 * @see https://carbondesignsystem.com/patterns/dialog-pattern/#dialog-types
	 */
	// type?: DialogType,
	/**
	 * User can touch/click any area in the overlay to dismiss the dialog
	 * @default 'false'
	 */
	overlayTouchDismiss?: boolean,
}
