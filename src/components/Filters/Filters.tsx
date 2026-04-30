import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Popover, Checkbox, DatePicker, Input, Button } from 'antd'
import {
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import type {
  FilterField,
  FilterValue,
  FilterValues,
  FiltersLabels,
  FiltersProps,
} from './Filters.types'
import {
  AddButton,
  AddIcon,
  AddMenuItem,
  AddMenuItemIcon,
  AddMenuPanel,
  CheckIcon,
  ChipDivider,
  ChipIcon,
  ChipLabel,
  ChipPlaceholder,
  ChipRemoveButton,
  ChipRoot,
  ChipRow,
  ChipValue,
  ClearAllButton,
  PopoverBody,
  PopoverFooter,
  PopoverFooterRight,
  Root,
  SelectList,
  SelectListItem,
  Summary,
  Trailing,
} from './Filters.styles'

const { RangePicker } = DatePicker

const DEFAULT_LABELS: Required<FiltersLabels> = {
  addFilter: 'Add filter',
  clearAll: 'Clear all',
  apply: 'Apply',
  cancel: 'Cancel',
  empty: '—',
}

function isEmptyValue(v: FilterValue): boolean {
  if (v == null) return true
  if (typeof v === 'string') return v.length === 0
  if (Array.isArray(v)) {
    if (v.length === 0) return true
    return v.every((x) => x == null || (typeof x === 'string' && x.length === 0))
  }
  return false
}

function formatValue(field: FilterField, value: FilterValue): string {
  switch (field.type) {
    case 'select': {
      const opt = field.options.find((o) => o.value === value)
      return opt?.label ?? String(value ?? '')
    }
    case 'multi-select': {
      const arr = (value as string[]) ?? []
      if (arr.length === 0) return ''
      const labels = arr
        .map((v) => field.options.find((o) => o.value === v)?.label ?? v)
        .filter(Boolean)
      if (labels.length <= 2) return labels.join(', ')
      return `${labels[0]}, ${labels[1]} +${labels.length - 2}`
    }
    case 'date-range': {
      const arr = value as [Dayjs | null, Dayjs | null] | undefined
      if (!arr || !arr[0] || !arr[1]) return ''
      const fmt = (d: Dayjs) => d.format('MMM D, YYYY')
      const a = fmt(arr[0])
      const b = fmt(arr[1])
      return a === b ? a : `${a} – ${b}`
    }
    case 'text':
      return String(value ?? '')
  }
}

function FilterChip({
  field,
  value,
  onCommit,
  onRemove,
  onCancel,
  defaultOpen,
  labels,
}: {
  field: FilterField
  value: FilterValue
  onCommit: (next: FilterValue) => void
  onRemove: () => void
  onCancel: () => void
  defaultOpen?: boolean
  labels: Required<FiltersLabels>
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  const [draft, setDraft] = useState<FilterValue>(value)
  const justClosedRef = useRef(false)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const handleApply = useCallback(
    (next?: FilterValue) => {
      const v = next === undefined ? draft : next
      onCommit(v)
      justClosedRef.current = true
      setOpen(false)
    },
    [draft, onCommit],
  )

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        setDraft(value)
        setOpen(true)
        return
      }
      // closing: if we just applied or removed, skip cancel logic
      if (justClosedRef.current) {
        justClosedRef.current = false
        setOpen(false)
        return
      }
      setDraft(value)
      onCancel()
      setOpen(false)
    },
    [value, onCancel],
  )

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      justClosedRef.current = true
      setOpen(false)
      onRemove()
    },
    [onRemove],
  )

  const hasValue = !isEmptyValue(value)
  const valueText = hasValue ? formatValue(field, value) : ''

  const editor = renderEditor({
    field,
    draft,
    setDraft,
    onApply: handleApply,
    onCancel: close,
    labels,
  })

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      content={editor}
      trigger="click"
      placement="bottomLeft"
      destroyOnHidden
    >
      <ChipRoot
        type="button"
        $hasValue={hasValue}
        $open={open}
        aria-label={`Filter: ${field.label}${hasValue ? `, ${valueText}` : ''}`}
        aria-expanded={open}
      >
        {field.icon && <ChipIcon>{field.icon}</ChipIcon>}
        <ChipLabel>{field.label}</ChipLabel>
        <ChipDivider>·</ChipDivider>
        {hasValue ? (
          <ChipValue title={valueText}>{valueText}</ChipValue>
        ) : (
          <ChipPlaceholder>{labels.empty}</ChipPlaceholder>
        )}
        <ChipRemoveButton
          role="button"
          aria-label={`Remove ${field.label} filter`}
          onClick={handleRemoveClick}
        >
          <CloseOutlined style={{ fontSize: 11 }} />
        </ChipRemoveButton>
      </ChipRoot>
    </Popover>
  )
}

function renderEditor({
  field,
  draft,
  setDraft,
  onApply,
  onCancel,
  labels,
}: {
  field: FilterField
  draft: FilterValue
  setDraft: (v: FilterValue) => void
  onApply: (v?: FilterValue) => void
  onCancel: () => void
  labels: Required<FiltersLabels>
}): ReactNode {
  switch (field.type) {
    case 'select': {
      const current = (draft as string | null | undefined) ?? null
      return (
        <SelectList role="listbox" aria-label={field.label}>
          {field.options.map((opt) => {
            const active = current === opt.value
            return (
              <SelectListItem
                key={opt.value}
                role="option"
                aria-selected={active}
                $active={active}
                type="button"
                onClick={() => onApply(opt.value)}
              >
                <span>{opt.label}</span>
                {active && (
                  <CheckIcon>
                    <CheckOutlined />
                  </CheckIcon>
                )}
              </SelectListItem>
            )
          })}
        </SelectList>
      )
    }
    case 'multi-select': {
      const current = (draft as string[]) ?? []
      return (
        <PopoverBody>
          <Checkbox.Group
            value={current}
            onChange={(vals) => setDraft(vals as string[])}
            options={field.options}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
          />
          <PopoverFooter>
            <Button type="text" size="small" onClick={() => setDraft([])}>
              Reset
            </Button>
            <PopoverFooterRight>
              <Button size="small" onClick={onCancel}>
                {labels.cancel}
              </Button>
              <Button size="small" type="primary" onClick={() => onApply()}>
                {labels.apply}
              </Button>
            </PopoverFooterRight>
          </PopoverFooter>
        </PopoverBody>
      )
    }
    case 'date-range': {
      const current = (draft as [Dayjs | null, Dayjs | null] | undefined) ?? [null, null]
      return (
        <PopoverBody>
          <RangePicker
            value={current}
            onChange={(v) => setDraft(v as [Dayjs | null, Dayjs | null])}
            allowClear
            placeholder={field.placeholder}
          />
          <PopoverFooter>
            <Button type="text" size="small" onClick={() => setDraft([null, null])}>
              Reset
            </Button>
            <PopoverFooterRight>
              <Button size="small" onClick={onCancel}>
                {labels.cancel}
              </Button>
              <Button size="small" type="primary" onClick={() => onApply()}>
                {labels.apply}
              </Button>
            </PopoverFooterRight>
          </PopoverFooter>
        </PopoverBody>
      )
    }
    case 'text': {
      const current = (draft as string) ?? ''
      return (
        <PopoverBody>
          <Input
            autoFocus
            value={current}
            onChange={(e) => setDraft(e.target.value)}
            onPressEnter={() => onApply()}
            placeholder={field.placeholder}
            allowClear
          />
          <PopoverFooter>
            <Button type="text" size="small" onClick={() => setDraft('')}>
              Reset
            </Button>
            <PopoverFooterRight>
              <Button size="small" onClick={onCancel}>
                {labels.cancel}
              </Button>
              <Button size="small" type="primary" onClick={() => onApply()}>
                {labels.apply}
              </Button>
            </PopoverFooterRight>
          </PopoverFooter>
        </PopoverBody>
      )
    }
  }
}

function fieldTypeIcon(field: FilterField): ReactNode {
  if (field.icon) return field.icon
  if (field.type === 'date-range') return <CalendarOutlined />
  return null
}

function AddFilterButton({
  inactiveFields,
  onPick,
  label,
  disabled,
}: {
  inactiveFields: FilterField[]
  onPick: (field: FilterField) => void
  label: string
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)

  if (inactiveFields.length === 0) return null

  return (
    <Popover
      open={open}
      onOpenChange={(o) => !disabled && setOpen(o)}
      placement="bottomLeft"
      trigger="click"
      content={
        <AddMenuPanel role="menu" aria-label={label}>
          {inactiveFields.map((f) => (
            <AddMenuItem
              key={f.key}
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false)
                onPick(f)
              }}
            >
              <AddMenuItemIcon>{fieldTypeIcon(f)}</AddMenuItemIcon>
              {f.label}
            </AddMenuItem>
          ))}
        </AddMenuPanel>
      }
    >
      <AddButton
        type="button"
        $disabled={disabled}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <AddIcon>
          <PlusOutlined />
        </AddIcon>
        {label}
      </AddButton>
    </Popover>
  )
}

export function Filters({
  fields,
  value: controlledValue,
  defaultValue,
  onChange,
  resultSummary,
  labels: labelOverrides,
  className,
  style,
}: FiltersProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<FilterValues>(defaultValue ?? {})
  const values = isControlled ? controlledValue : internalValue

  /** Field key whose chip was just added but hasn't been committed yet. */
  const [pendingKey, setPendingKey] = useState<string | null>(null)

  const labels = { ...DEFAULT_LABELS, ...labelOverrides }

  const setValues = useCallback(
    (next: FilterValues) => {
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const commit = useCallback(
    (key: string, val: FilterValue) => {
      const next: FilterValues = { ...values }
      if (isEmptyValue(val)) {
        delete next[key]
      } else {
        next[key] = val
      }
      setValues(next)
      setPendingKey((k) => (k === key ? null : k))
    },
    [values, setValues],
  )

  const remove = useCallback(
    (key: string) => {
      const next: FilterValues = {}
      for (const k of Object.keys(values)) {
        if (k !== key) next[k] = values[k]
      }
      setValues(next)
      setPendingKey((k) => (k === key ? null : k))
    },
    [values, setValues],
  )

  const cancelPending = useCallback(
    (key: string) => {
      setPendingKey((k) => (k === key ? null : k))
    },
    [],
  )

  const clearAll = useCallback(() => {
    setValues({})
    setPendingKey(null)
  }, [setValues])

  const visibleFields = useMemo(
    () => fields.filter((f) => !isEmptyValue(values[f.key]) || f.key === pendingKey),
    [fields, values, pendingKey],
  )

  const inactiveFields = useMemo(
    () =>
      fields.filter(
        (f) => isEmptyValue(values[f.key]) && f.key !== pendingKey,
      ),
    [fields, values, pendingKey],
  )

  const hasActive = useMemo(
    () => fields.some((f) => !isEmptyValue(values[f.key])),
    [fields, values],
  )

  return (
    <Root className={className} style={style}>
      <ChipRow>
        {visibleFields.map((field) => (
          <FilterChip
            key={field.key}
            field={field}
            value={values[field.key]}
            onCommit={(v) => commit(field.key, v)}
            onRemove={() => remove(field.key)}
            onCancel={() => cancelPending(field.key)}
            defaultOpen={field.key === pendingKey}
            labels={labels}
          />
        ))}
        <AddFilterButton
          inactiveFields={inactiveFields}
          onPick={(f) => setPendingKey(f.key)}
          label={labels.addFilter}
          disabled={pendingKey !== null}
        />
      </ChipRow>
      {(hasActive || resultSummary) && (
        <Trailing>
          {resultSummary && <Summary>{resultSummary}</Summary>}
          {hasActive && (
            <ClearAllButton type="button" onClick={clearAll}>
              {labels.clearAll}
            </ClearAllButton>
          )}
        </Trailing>
      )}
    </Root>
  )
}

Filters.displayName = 'Filters'
