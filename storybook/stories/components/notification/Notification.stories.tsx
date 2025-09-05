import type {
	Meta,
	StoryObj,
} from '@storybook/react-native'

import {
	Notification,
} from '@audira/carbon-react-native'

export default {
	title: 'Components/Notification',
} satisfies Meta<Notification.BaseProps>

const
	commonArgs: StoryObj<Notification.Actionable.ErrorProps>['args'] =
		{
			color: 'high_contrast',
			title: 'Title',
			subtitle: 'Lorem ipsum dolor sit amet',
		},

	commonArgTypes: StoryObj<Notification.Actionable.ErrorProps>['argTypes'] =
		{
			color: {
				control: 'select',
				options: [
					'high_contrast',
					'low_contrast',
				] satisfies Notification.NotificationColor[],
			},
			title: {
				control: 'text',
			},
			subtitle: {
				control: 'text',
			},
		}

export const ActionableError: StoryObj<Notification.Actionable.ErrorProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Actionable.Error
				{ ...args }
			/>
		)
	},
}

export const ActionableInformational: StoryObj<Notification.Actionable.InformationalProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Actionable.Informational
				{ ...args }
			/>
		)
	},
}

export const ActionableSuccess: StoryObj<Notification.Actionable.SuccessProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Actionable.Success
				{ ...args }
			/>
		)
	},
}

export const ActionableWarning: StoryObj<Notification.Actionable.WarningProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Actionable.Warning
				{ ...args }
			/>
		)
	},
}

// ####################

// ## Actionable Inline

export const ActionableInlineError: StoryObj<Notification.ActionableInline.ErrorProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.ActionableInline.Error
				{ ...args }
			/>
		)
	},
}

export const ActionableInlineInformational: StoryObj<Notification.ActionableInline.InformationalProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.ActionableInline.Informational
				{ ...args }
			/>
		)
	},
}

export const ActionableInlineSuccess: StoryObj<Notification.ActionableInline.SuccessProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.ActionableInline.Success
				{ ...args }
			/>
		)
	},
}

export const ActionableInlineWarning: StoryObj<Notification.ActionableInline.WarningProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.ActionableInline.Warning
				{ ...args }
			/>
		)
	},
}

// ##########

// ## Callout

export const CalloutError: StoryObj<Notification.Callout.ErrorProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Callout.Error
				{ ...args }
			/>
		)
	},
}

export const CalloutInformational: StoryObj<Notification.Callout.InformationalProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Callout.Error
				{ ...args }
			/>
		)
	},
}

export const CalloutSuccess: StoryObj<Notification.Callout.SuccessProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Callout.Success
				{ ...args }
			/>
		)
	},
}

export const CalloutWarning: StoryObj<Notification.Callout.WarningProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Callout.Warning
				{ ...args }
			/>
		)
	},
}

// ####################

// ## Callout Inline

export const CalloutInlineError: StoryObj<Notification.CalloutInline.ErrorProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.CalloutInline.Error
				{ ...args }
			/>
		)
	},
}

export const CalloutInlineInformational: StoryObj<Notification.CalloutInline.InformationalProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.CalloutInline.Informational
				{ ...args }
			/>
		)
	},
}

export const CalloutInlineSuccess: StoryObj<Notification.CalloutInline.SuccessProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.CalloutInline.Success
				{ ...args }
			/>
		)
	},
}

export const CalloutInlineWarning: StoryObj<Notification.CalloutInline.WarningProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.CalloutInline.Warning
				{ ...args }
			/>
		)
	},
}

// ########

// ## Toast

export const ToastError: StoryObj<Notification.Toast.ErrorProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Toast.Error
				{ ...args }
			/>
		)
	},
}

export const ToastInformational: StoryObj<Notification.Toast.InformationalProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Toast.Error
				{ ...args }
			/>
		)
	},
}

export const ToastSuccess: StoryObj<Notification.Toast.SuccessProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Toast.Success
				{ ...args }
			/>
		)
	},
}

export const ToastWarning: StoryObj<Notification.Toast.WarningProps> = {
	args: commonArgs,
	argTypes: commonArgTypes,
	render(args) {
		return (
			<Notification.Toast.Warning
				{ ...args }
			/>
		)
	},
}
