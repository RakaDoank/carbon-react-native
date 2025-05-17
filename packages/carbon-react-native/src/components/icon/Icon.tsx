import {
	Component,
} from 'react'

import * as IconHelper from '@carbon/icon-helpers'

import {
	SvgXml,
} from 'react-native-svg'

import type {
	IconProps,
} from './IconProps'

/**
 * Icon component is intentionally written in the form of React Class Component to support `Animated.createAnimatedComponent` API from React Native Reanimated
 */
export class Icon extends Component<IconProps> {

	render() {
		try {
			return (
				<SvgXml
					{ ...this.props }
					xml={ IconHelper.toString(this.props.src as never) }
					width={ this.props.width || '100%' }
					height={ this.props.height || '100%' }
				/>
			)
		} catch{
			return (
				<SvgXml
					{ ...this.props }
					xml={ backupIcon }
					width={ this.props.width || '100%' }
					height={ this.props.height || '100%' }
				/>
			)
		}
	}

}

/**
 * Copied from  
 * https://github.com/carbon-design-system/carbon-react-native/blob/main/src/helpers/index.tsx
 */
const backupIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.17 13.69"><line x1="0.71" y1="0.97" x2="12.46" y2="12.72" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1.02" y1="13.02" x2="12.15" y2="0.67" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></svg>'
