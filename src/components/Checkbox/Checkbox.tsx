import { forwardRef } from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import type { CheckboxProps, CheckboxGroupProps } from './Checkbox.types'

const CheckboxBase = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return <AntCheckbox ref={ref as never} {...props} />
})
CheckboxBase.displayName = 'Checkbox'

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
  return <AntCheckbox.Group ref={ref as never} {...props} />
})
CheckboxGroup.displayName = 'Checkbox.Group'

export const Checkbox = Object.assign(CheckboxBase, {
  Group: CheckboxGroup,
})
