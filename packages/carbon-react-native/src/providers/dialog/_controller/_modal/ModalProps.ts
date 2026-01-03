import type {
	ViewProps,
} from "react-native"

import type {
	DialogProviderAnimationConfig,
} from "../../DialogProviderAnimationConfig"

export interface ModalProps extends ViewProps {
	animationConfig?: DialogProviderAnimationConfig,
}
