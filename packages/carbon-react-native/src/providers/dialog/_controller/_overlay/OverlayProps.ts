import type {
	ViewProps,
} from 'react-native'

export interface OverlayProps extends ViewProps {
	defaultAnimationConfig: {
		duration?: number,
	},
}
