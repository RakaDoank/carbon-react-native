import type {
	ViewProps,
} from 'react-native'

import type {
	DialogProviderAnimatedConfig,
} from '../../DialogProviderAnimatedConfig'

import type {
	DialogProviderReanimatedConfig,
} from '../../DialogProviderReanimatedConfig'

export interface ModalProps extends ViewProps {
	animatedConfig?: DialogProviderAnimatedConfig,
	reanimatedConfig?: DialogProviderReanimatedConfig,
}
