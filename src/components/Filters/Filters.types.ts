import type { CSSProperties, ReactNode } from 'react'
import type { Dayjs } from 'dayjs'

export interface FilterFieldOption {
  label: string
  value: string
}

export type FilterValue =
  | string
  | string[]
  | [Dayjs | null, Dayjs | null]
  | null
  | undefined

export type FilterValues = Record<string, FilterValue>

interface FilterFieldBase {
  /** Stable identifier used as the key in {@link FilterValues}. */
  key: string
  /** Human-readable label rendered on the chip and the "Add filter" menu. */
  label: string
  /** Optional icon shown before the label on the chip. */
  icon?: ReactNode
}

export type FilterField =
  | (FilterFieldBase & {
      type: 'select'
      options: FilterFieldOption[]
      placeholder?: string
    })
  | (FilterFieldBase & {
      type: 'multi-select'
      options: FilterFieldOption[]
      placeholder?: string
    })
  | (FilterFieldBase & {
      type: 'typeahead'
      /**
       * Static options. Used when {@link onSearch} is not provided (filtered
       * client-side as the user types) and to resolve the chip label for a
       * committed value. When using {@link onSearch}, include any pre-filled
       * value here so its label can be shown before the popover is opened.
       */
      options?: FilterFieldOption[]
      /**
       * Async option loader. Called (debounced) as the user types. Return the
       * options to show. When provided, {@link options} is no longer filtered
       * client-side — the loader is the single source of suggestions.
       */
      onSearch?: (query: string) => FilterFieldOption[] | Promise<FilterFieldOption[]>
      /** Minimum characters before {@link onSearch} fires. Default: 0. */
      minChars?: number
      /** Debounce in ms for {@link onSearch}. Default: 250. */
      debounceMs?: number
      placeholder?: string
    })
  | (FilterFieldBase & {
      type: 'date-range'
      placeholder?: [string, string]
    })
  | (FilterFieldBase & {
      type: 'text'
      placeholder?: string
    })

export interface FiltersLabels {
  /** Trigger button label when at least one filter can still be added. Default: "Add filter". */
  addFilter?: string
  /** Reset button label. Default: "Clear all". */
  clearAll?: string
  /** Apply button inside the popover. Default: "Apply". */
  apply?: string
  /** Cancel button inside the popover. Default: "Cancel". */
  cancel?: string
  /** Empty-state placeholder for chips that have no value yet. Default: "—". */
  empty?: string
  /** Typeahead message shown while async options load. Default: "Searching…". */
  searching?: string
  /** Typeahead message shown when a search returns no options. Default: "No results". */
  noResults?: string
}

export interface FiltersProps {
  /** Declarative list of available filter fields. */
  fields: FilterField[]
  /** Controlled values keyed by field.key. */
  value?: FilterValues
  /** Initial values when uncontrolled. */
  defaultValue?: FilterValues
  /** Fires whenever the committed value changes. */
  onChange?: (next: FilterValues) => void
  /**
   * Right-aligned summary slot — typically a result count
   * (e.g. "Showing 12 of 47 transactions"). Hidden when no filters are active.
   */
  resultSummary?: ReactNode
  /** Override built-in copy for i18n. */
  labels?: FiltersLabels
  className?: string
  style?: CSSProperties
}
