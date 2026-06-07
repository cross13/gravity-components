---
'@crosscode/gravity-components': minor
---

Reduce overall component scale and refresh the app chrome for a less invasive look & feel:

- **Compact sizing (no more "large" default):** control height drops from `40` to Ant Design's standard `32` across Button, Input, Select, DatePicker and the global token, with `controlHeightLG` `48 → 40` and `controlHeightSM` `32 → 24`. Button padding, table cell padding, card padding, menu item height and pagination height are trimmed to match. Font sizes are unchanged.
- **Sidebar:** now white (`#FFFFFF`) with a light-themed menu and light borders instead of the dark navy gradient, so it reads as less invasive.
- **Topbar:** solid brand-navy background (`#003973`) with light text/icons, matching production.
- **AppShell `projectBar`:** new optional `projectBar` prop renders a full-width strip directly below the header (e.g. a project switcher).

This changes the default visual scale and chrome colors for all consumers.
