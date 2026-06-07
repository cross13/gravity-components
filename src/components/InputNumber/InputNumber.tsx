import { forwardRef } from 'react'
import { InputNumber as AntInputNumber } from 'antd'
import type { InputNumberProps } from './InputNumber.types'

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  return <AntInputNumber ref={ref as never} {...props} />
})
InputNumber.displayName = 'InputNumber'
