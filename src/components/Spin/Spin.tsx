import { Spin as AntSpin } from 'antd'
import type { SpinProps } from './Spin.types'

export function Spin(props: SpinProps) {
  return <AntSpin {...props} />
}

Spin.displayName = 'Spin'
