import styled from 'styled-components'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: #ffffff;
  border-right: 1px solid #e8edf2;
`

export const LogoRow = styled.div<{ $collapsed: boolean }>`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? 'center' : 'flex-start')};
  padding: ${(p) => (p.$collapsed ? '0' : '0 22px')};
  border-bottom: 1px solid #e8edf2;
`

export const MenuWrap = styled.div`
  padding: 12px 12px 0;
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
  background: #ffffff;
  border-top: 1px solid #e8edf2;
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
  color: #8494a7;
  transition: color 0.2s;

  &:hover {
    color: #003973;
  }
`
