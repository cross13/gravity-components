---
'@crosscode/gravity-components': minor
---

Add themed `Radio`, `Switch`, `Checkbox`, and `InputNumber` form controls.

- **`Radio`** — drop-in for antd `Radio`, with `Radio.Group` / `Radio.Button` (also exported as `RadioGroup` / `RadioButton`). Types: `RadioProps`, `RadioGroupProps`, `RadioButtonProps`.
- **`Checkbox`** — drop-in for antd `Checkbox`, with `Checkbox.Group` (also exported as `CheckboxGroup`). Types: `CheckboxProps`, `CheckboxGroupProps`, `CheckboxOptionType`.
- **`Switch`** — drop-in for antd `Switch`. Type: `SwitchProps`.
- **`InputNumber`** — drop-in for antd `InputNumber`, themed to match `Input` (cyan active border, 8px radius, gravity control heights). Type: `InputNumberProps`.

Each extends its antd counterpart's props and is themed via `GravityProvider`. Closes GRA-130.
