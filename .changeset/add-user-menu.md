---
'@crosscode/gravity-components': minor
---

Add `UserMenu` component — an account dropdown for the top bar.

Clicking the avatar (initials over a brand gradient, an image URL, or a custom node) opens an animated panel (scale + fade in from the trigger corner, with a chevron that flips and rows that nudge on hover; respects `prefers-reduced-motion`). The panel shows:

- A header with an avatar miniature, name, secondary line (e.g. email), and a status-dot **role pill**
- Configurable menu rows (`items`) with icons, optional `extra` badges, and dividers
- A language switch (EN / ES by default, any list via `languages`) — controlled or uncontrolled
- A danger-styled **Sign out** action

Supports controlled/uncontrolled `open` and `language`, callbacks (`onSelect`, `onLanguageChange`, `onLogout`, `onOpenChange`), an optional avatar-only trigger (`showText={false}`), and a `labels` prop for i18n. Exports `UserMenu` plus the `UserMenuProps`, `UserMenuItem`, `UserMenuLabels`, and `UserMenuLanguage` types.

Also fixes the `size-limit` measurement to ignore `@ant-design/icons` (an `external`/peer-style consumer install that is never bundled into `dist`), so the budget reflects only shipped code — consistent with how `antd` and `react` are already excluded.
