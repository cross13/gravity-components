import { Drawer as AntDrawer } from 'antd'
import type { DrawerProps } from './Drawer.types'

export function Drawer({ size = 480, ...props }: DrawerProps) {
  return <AntDrawer size={size} {...props} />
}

Drawer.displayName = 'Drawer'
