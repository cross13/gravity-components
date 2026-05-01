# @crosscode/gravity-components

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
