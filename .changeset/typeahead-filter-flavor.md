---
'@crosscode/gravity-components': minor
---

Add a `typeahead` filter flavor to `Filters`. Declare a field with `type: 'typeahead'` to get a searchable single-select chip. It filters a static `options` list client-side, or loads suggestions remotely via an async `onSearch(query)` (debounced, with `minChars` and `debounceMs` controls). Labels for async-resolved values are cached so the chip shows the chosen option's label. Adds `searching` and `noResults` to `FiltersLabels` for i18n.
