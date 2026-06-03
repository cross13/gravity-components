# @crosscode/gravity-components

## 0.8.0

### Minor Changes

- 5e41fd5: Add a `typeahead` filter flavor to `Filters`. Declare a field with `type: 'typeahead'` to get a searchable single-select chip. It filters a static `options` list client-side, or loads suggestions remotely via an async `onSearch(query)` (debounced, with `minChars` and `debounceMs` controls). Labels for async-resolved values are cached so the chip shows the chosen option's label. Adds `searching` and `noResults` to `FiltersLabels` for i18n.

## 0.7.0

### Minor Changes

- 30ea4b8: UserMenu: add `avatarBackground` and `avatarColor` props to configure the avatar's background (color or gradient) and foreground (initials/icon) color.

## 0.6.0

### Minor Changes

- 171e611: Add `NotificationCenter` component — an animated top-bar bell with an in-page notification panel.

  The bell rings (swing) and shows a pulsing badge while there are unread items (respects `prefers-reduced-motion`). Clicking opens a themed `Popover` panel that keeps the user on the current page, with:
  - An unread count pill and a "Mark all as read" action
  - `All` / `Unread` segmented filter
  - Type-aware rows (`info` / `success` / `warning` / `error`) with a colored icon bubble, unread accent + tint, relative timestamps, and hover actions to mark-read or dismiss
  - Empty, loading, and high-volume (`99+`) states
  - Controlled/uncontrolled `open` state, callbacks for every action (`onItemClick`, `onMarkRead`, `onMarkAllRead`, `onDismiss`, `onViewAll`), and a `labels` prop for i18n

  Exports `NotificationCenter` plus the `NotificationCenterProps`, `NotificationCenterLabels`, `NotificationItem`, and `NotificationType` types. `time` values that are a `Date`/epoch/ISO string are auto-formatted to a relative string ("3m ago") without pulling in extra dependencies.

- 171e611: Add `UserMenu` component — an account dropdown for the top bar.

  Clicking the avatar (initials over a brand gradient, an image URL, or a custom node) opens an animated panel (scale + fade in from the trigger corner, with a chevron that flips and rows that nudge on hover; respects `prefers-reduced-motion`). The panel shows:
  - A header with an avatar miniature, name, secondary line (e.g. email), and a status-dot **role pill**
  - Configurable menu rows (`items`) with icons, optional `extra` badges, and dividers
  - A language switch (EN / ES by default, any list via `languages`) — controlled or uncontrolled
  - A danger-styled **Sign out** action

  Supports controlled/uncontrolled `open` and `language`, callbacks (`onSelect`, `onLanguageChange`, `onLogout`, `onOpenChange`), an optional avatar-only trigger (`showText={false}`), and a `labels` prop for i18n. Exports `UserMenu` plus the `UserMenuProps`, `UserMenuItem`, `UserMenuLabels`, and `UserMenuLanguage` types.

  Also fixes the `size-limit` measurement to ignore `@ant-design/icons` (an `external`/peer-style consumer install that is never bundled into `dist`), so the budget reflects only shipped code — consistent with how `antd` and `react` are already excluded.

## 0.5.1

### Patch Changes

- d832c66: Fix Pagination active item contrast — the active page number was rendered with `colorPrimary` (`#003973`) on top of `itemActiveBg` (`#003973`), making the digit nearly invisible on a navy background. Added explicit `itemActiveColor` / `itemActiveColorHover` overrides so the active page text is white.

## 0.5.0

### Minor Changes

- 14a7af6: Add `Filters` component — a chip-based filter bar with `select`, `multi-select`, `date-range`, and `text` field types. Declarative `fields` API, controlled or uncontrolled (`value` / `defaultValue`), and a `resultSummary` slot for "X of Y" feedback. Exported alongside types `FilterField`, `FilterFieldOption`, `FilterValue`, `FilterValues`, `FiltersLabels`, `FiltersProps`.

## 0.4.0

### Minor Changes

- Better PageHeader

## 0.3.2

### Patch Changes

- Better indicators

## 0.3.1

### Patch Changes

- Fix documentation

## 0.2.0

### Minor Changes

- Add netlify and github actions configuration
