import { useState } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Filters } from './Filters'
import type { FilterField, FilterFieldOption, FilterValues } from './Filters.types'

const instruments: FilterFieldOption[] = [
  { label: 'AL30 — Bonar 2030', value: 'al30' },
  { label: 'GD30 — Global 2030', value: 'gd30' },
  { label: 'YPFD — YPF S.A.', value: 'ypfd' },
]

function Harness({ fields, onChange }: { fields: FilterField[]; onChange?: (v: FilterValues) => void }) {
  const [value, setValue] = useState<FilterValues>({})
  return (
    <Filters
      fields={fields}
      value={value}
      onChange={(next) => {
        setValue(next)
        onChange?.(next)
      }}
    />
  )
}

async function openTypeahead(user: ReturnType<typeof userEvent.setup>, label: string) {
  await user.click(screen.getByRole('button', { name: /add filter/i }))
  await user.click(await screen.findByRole('menuitem', { name: new RegExp(label) }))
}

describe('Filters — typeahead', () => {
  it('filters static options client-side and commits on selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const fields: FilterField[] = [
      { key: 'instrument', label: 'Instrument', type: 'typeahead', options: instruments },
    ]
    render(<Harness fields={fields} onChange={onChange} />)

    await openTypeahead(user, 'Instrument')

    const listbox = await screen.findByRole('listbox', { name: 'Instrument' })
    // All options visible before typing.
    expect(within(listbox).getAllByRole('option')).toHaveLength(3)

    await user.type(screen.getByRole('textbox'), 'gd')
    await waitFor(() => {
      expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(1)
    })

    await user.click(screen.getByRole('option', { name: /GD30/ }))

    expect(onChange).toHaveBeenCalledWith({ instrument: 'gd30' })
    // Chip now shows the resolved label.
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Filter: Instrument, GD30 — Global 2030/ }),
      ).toBeInTheDocument()
    })
  })

  it('loads options via async onSearch, debounced, and caches the label', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onSearch = vi.fn(async (q: string) =>
      [
        { label: 'Client 001 — Acme', value: 'c1' },
        { label: 'Client 002 — Globex', value: 'c2' },
      ].filter((o) => o.label.toLowerCase().includes(q.toLowerCase())),
    )
    const fields: FilterField[] = [
      { key: 'client', label: 'Client', type: 'typeahead', onSearch, minChars: 1, debounceMs: 50 },
    ]
    render(<Harness fields={fields} onChange={onChange} />)

    await openTypeahead(user, 'Client')

    // Below minChars: no search fired.
    expect(onSearch).not.toHaveBeenCalled()

    await user.type(screen.getByRole('textbox'), 'globex')

    const option = await screen.findByRole('option', { name: /Globex/ })
    expect(onSearch).toHaveBeenCalled()

    await user.click(option)
    expect(onChange).toHaveBeenCalledWith({ client: 'c2' })
    // Label resolved from async result (not present in any static options list).
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Filter: Client, Client 002 — Globex/ }),
      ).toBeInTheDocument()
    })
  })
})
