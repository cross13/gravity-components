import { forwardRef } from 'react'
import { Radio as AntRadio } from 'antd'
import type { RadioProps, RadioGroupProps, RadioButtonProps } from './Radio.types'

const RadioBase = forwardRef<HTMLElement, RadioProps>((props, ref) => {
  return <AntRadio ref={ref as never} {...props} />
})
RadioBase.displayName = 'Radio'

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  return <AntRadio.Group ref={ref as never} {...props} />
})
RadioGroup.displayName = 'Radio.Group'

export const RadioButton = forwardRef<HTMLElement, RadioButtonProps>((props, ref) => {
  return <AntRadio.Button ref={ref as never} {...props} />
})
RadioButton.displayName = 'Radio.Button'

export const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Button: RadioButton,
})
