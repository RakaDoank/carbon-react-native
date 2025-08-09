import type {
	NotificationColor,
} from '../../NotificationColor'

export interface UseBaseProps {
	color?: NotificationColor,
	style: Record<NotificationColor, Record<'backgroundColor' | 'borderTopColor' | 'borderRightColor' | 'borderBottomColor', string>>,
	leftBarStyle: Record<NotificationColor, { backgroundColor: string }>,
	titleStyle: Record<NotificationColor, { color: string }>,
	iconColor: Record<NotificationColor, string>,
	iconCloseColor: Record<NotificationColor, string>,
	/**
	 * true to use background color for top-right-bottom border.  
	 * Currently for actionable variant
	 */
	transparentBorderColor?: boolean,
}
