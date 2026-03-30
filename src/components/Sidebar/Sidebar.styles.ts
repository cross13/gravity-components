import styled from 'styled-components'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #001224 0%, #001a33 100%);
  border-right: 1px solid rgba(0, 187, 221, 0.08);
`

export const LogoRow = styled.div<{ $collapsed: boolean }>`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? 'center' : 'flex-start')};
  padding: ${(p) => (p.$collapsed ? '0' : '0 22px')};
  border-bottom: 1px solid rgba(0, 187, 221, 0.06);
`

export const MenuWrap = styled.div`
  padding: 14px 12px 0;
`

export const StyledMenu = styled(Menu)`
  && {
    background: transparent;
    border-inline-end: none;
  }
`

export const CollapseTrigger = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 187, 221, 0.06);
  padding: 14px 0;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
`
