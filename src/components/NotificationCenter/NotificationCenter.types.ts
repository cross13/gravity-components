import type { CSSProperties, ReactNode } from 'react'
import type { PopoverProps } from 'antd'

/** Severity / category of a notification — drives the leading icon + accent color. */
export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface NotificationItem {
  /** Stable unique id — used as React key and in callbacks. */
  id: string
  /** Primary line. */
  title: ReactNode
  /** Optional supporting line below the title. */
  description?: ReactNode
  /**
   * When the event happened. A `Date` (or epoch ms) is rendered as a relative
   * time ("3m ago"); a string/node is rendered verbatim.
   */
  time?: Date | number | string | ReactNode
  /** Whether the item has been read. Defaults to false (unread). */
  read?: boolean
  /** Severity — selects the default icon + accent. Defaults to `info`. */
  type?: NotificationType
  /** Custom leading element (avatar, logo). Overrides the type icon when set. */
  icon?: ReactNode
}

export interface NotificationCenterLabels {
  /** Panel title. Default: "Notifications". */
  title?: string
  /** "Mark all as read" action. */
  markAllRead?: string
  /** "All" filter tab. */
  all?: string
  /** "Unread" filter tab. */
  unread?: string
  /** Footer link. Default: "View all notifications". */
  viewAll?: string
  /** Empty-state heading. */
  empty?: string
  /** Per-item "mark as read" tooltip. */
  markRead?: string
  /** Per-item "dismiss" tooltip. */
  dismiss?: string
}

export interface NotificationCenterProps {
  /** Notifications to display, newest first. */
  items: NotificationItem[]
  /**
   * Override the unread count shown on the badge. When omitted, it is derived
   * from `items` (count of `read !== true`).
   */
  unreadCount?: number
  /** Cap the badge number, e.g. `99` renders "99+". Default: 99. */
  maxCount?: number

  /** Controlled open state of the panel. */
  open?: boolean
  /** Initial open state when uncontrolled. Default: false. */
  defaultOpen?: boolean
  /** Called when the panel opens or closes. */
  onOpenChange?: (open: boolean) => void

  /** Fired when a notification row is clicked. */
  onItemClick?: (item: NotificationItem) => void
  /** Fired when a single item is marked read (row click or hover action). */
  onMarkRead?: (id: string) => void
  /** Fired when "Mark all as read" is pressed. */
  onMarkAllRead?: () => void
  /** Fired when an item is dismissed. When omitted, the dismiss action is hidden. */
  onDismiss?: (id: string) => void
  /** Fired when the footer "View all" link is pressed. When omitted, footer is hidden. */
  onViewAll?: () => void

  /** Popover placement relative to the bell. Default: "bottomRight". */
  placement?: PopoverProps['placement']
  /** Panel width in px. Default: 380. */
  width?: number
  /** Max height of the scrollable list in px. Default: 420. */
  listMaxHeight?: number

  /** Show the All / Unread filter tabs. Default: true. */
  filterable?: boolean
  /** Show the "Mark all as read" header action. Default: true. */
  showMarkAllRead?: boolean
  /** Show a loading spinner in place of the list. */
  loading?: boolean
  /** Animate the bell (ring swing + badge pulse) while unread > 0. Default: true. */
  animate?: boolean

  /** Override copy for i18n. */
  labels?: NotificationCenterLabels

  /** Custom empty-state content. */
  emptyContent?: ReactNode

  className?: string
  style?: CSSProperties
}
