import { useState, useCallback } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { SidebarProps } from './Sidebar.types'
import {
  CollapseTrigger,
  LogoRow,
  MenuWrap,
  StyledMenu,
  StyledSider,
} from './Sidebar.styles'

export function Sidebar({
  items,
  selectedKey,
  collapsed: controlledCollapsed,
  onCollapse,
  onSelect,
  logo,
  collapsedLogo,
  width = 260,
  collapsedWidth = 72,
  style,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed

  const handleCollapse = useCallback(() => {
    const next = !collapsed
    if (!isControlled) setInternalCollapsed(next)
    onCollapse?.(next)
  }, [collapsed, isControlled, onCollapse])

  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={width}
      collapsedWidth={collapsedWidth}
      className={className}
      theme="dark"
      style={style}
    >
      <LogoRow $collapsed={collapsed}>
        {collapsed ? collapsedLogo ?? logo : logo}
      </LogoRow>

      <MenuWrap>
        <StyledMenu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : undefined}
          items={items}
          onClick={({ key }) => onSelect?.(key)}
        />
      </MenuWrap>

      <CollapseTrigger onClick={handleCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </CollapseTrigger>
    </StyledSider>
  )
}

Sidebar.displayName = 'Sidebar'
