---
'@crosscode/gravity-components': patch
---

Fix Pagination active item contrast — the active page number was rendered with `colorPrimary` (`#003973`) on top of `itemActiveBg` (`#003973`), making the digit nearly invisible on a navy background. Added explicit `itemActiveColor` / `itemActiveColorHover` overrides so the active page text is white.
