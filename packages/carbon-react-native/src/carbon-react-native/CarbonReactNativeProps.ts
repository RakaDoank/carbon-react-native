import type {
	GlobalConfigContext,
} from '../_internal/contexts'

import {
	type ThemeProviderProps,
} from '../_internal/providers'

export interface CarbonReactNativeProps extends ThemeProviderProps {
	globalConfig?: GlobalConfigContext,
}
