import { forwardRef } from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import type { DatePickerProps, RangePickerProps } from './DatePicker.types'

export const DatePicker = forwardRef<unknown, DatePickerProps>((props, ref) => {
  return <AntDatePicker ref={ref as never} {...props} />
})
DatePicker.displayName = 'DatePicker'

const AntRangePicker = AntDatePicker.RangePicker
export const RangePicker = forwardRef<unknown, RangePickerProps>((props, ref) => {
  return <AntRangePicker ref={ref as never} {...props} />
})
RangePicker.displayName = 'RangePicker'
