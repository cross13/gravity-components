---
'@crosscode/gravity-components': minor
---

Add `NotificationCenter` component — an animated top-bar bell with an in-page notification panel.

The bell rings (swing) and shows a pulsing badge while there are unread items (respects `prefers-reduced-motion`). Clicking opens a themed `Popover` panel that keeps the user on the current page, with:

- An unread count pill and a "Mark all as read" action
- `All` / `Unread` segmented filter
- Type-aware rows (`info` / `success` / `warning` / `error`) with a colored icon bubble, unread accent + tint, relative timestamps, and hover actions to mark-read or dismiss
- Empty, loading, and high-volume (`99+`) states
- Controlled/uncontrolled `open` state, callbacks for every action (`onItemClick`, `onMarkRead`, `onMarkAllRead`, `onDismiss`, `onViewAll`), and a `labels` prop for i18n

Exports `NotificationCenter` plus the `NotificationCenterProps`, `NotificationCenterLabels`, `NotificationItem`, and `NotificationType` types. `time` values that are a `Date`/epoch/ISO string are auto-formatted to a relative string ("3m ago") without pulling in extra dependencies.
