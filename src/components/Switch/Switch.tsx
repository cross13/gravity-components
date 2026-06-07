import { forwardRef } from 'react'
import { Switch as AntSwitch } from 'antd'
import type { SwitchProps } from './Switch.types'

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  return <AntSwitch ref={ref as never} {...props} />
})
Switch.displayName = 'Switch'
