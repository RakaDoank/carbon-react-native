import type {
	StorybookConfig,
} from '@storybook/react-native';

export default {
	stories: [
		'../stories/**/*.stories.?(ts|tsx)',
	],
	addons: [
		'@storybook/addon-ondevice-notes',
		'@storybook/addon-ondevice-controls',
		'@storybook/addon-ondevice-backgrounds',
		'@storybook/addon-ondevice-actions',
	],
} satisfies StorybookConfig
