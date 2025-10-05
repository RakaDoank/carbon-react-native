import type {
	GlobalConfigContext,
} from '../../contexts'

export interface GlobalConfigProviderProps extends GlobalConfigContext {
	children?: React.ReactNode,
}
