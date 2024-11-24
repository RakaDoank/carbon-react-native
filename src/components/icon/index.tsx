import * as IconHelper from '@carbon/icon-helpers'

import {
	SvgXml,
	type XmlProps,
} from 'react-native-svg'

import type {
	SharedType,
} from '../../types'

export interface IconProps extends Omit<XmlProps, 'xml'> {
	src: SharedType.CarbonIcon,
}

export function Icon({
	src,
	width,
	height,
	...props
}: IconProps): React.JSX.Element {

	try {
		return (
			<SvgXml
				{ ...props }
				xml={ IconHelper.toString(src as any) }
				width={ width || '100%' }
				height={ height || '100%' }
			/>
		)
	} catch(e) {
		/**
		 * Copied from  
		 * https://github.com/carbon-design-system/carbon-react-native/blob/main/src/helpers/index.tsx
		 */
		const backupIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.17 13.69"><line x1="0.71" y1="0.97" x2="12.46" y2="12.72" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1.02" y1="13.02" x2="12.15" y2="0.67" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></svg>'

		return (
			<SvgXml
				{ ...props }
				xml={ backupIcon }
				width={ width || '100%' }
				height={ height || '100%' }
			/>
		)
	}

}
